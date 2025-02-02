import { Command } from '../../decorators'
import { AbstractCommand } from '../../abstract.command'
import {
  PipelineModelInterface,
  PipelineRunnerModelInterface,
} from '../../../../foundations-ts-definitions/deployment-schema'
import ora from 'ora'
import { REAPIT_PIPELINE_CONFIG_FILE } from './constants'
import { Multispinner, SpinnerState } from '../../utils/multispinner'
import chalk from 'chalk'

@Command({
  name: 'deploy',
  description: 'Starts a manual deployment (from github)',
})
export class DeployPipelineCommand extends AbstractCommand {
  async run() {
    const pipeline = await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (!pipeline) {
      this.writeLine(chalk.red('no pipeline config found'))
      process.exit(1)
    }

    const spinner = ora('Creating deployment...').start()

    const response = await (
      await this.axios(spinner)
    ).post<PipelineRunnerModelInterface>(`/pipeline/${pipeline.id}/pipeline-runner`)

    if (response.status === 200) {
      spinner.succeed('Deployment started')
    } else if (response.status === 409) {
      spinner.fail('Cannot deploy, deploying already in progress')
      process.exit(1)
    } else {
      spinner.fail('Deployment creation failed')
    }

    const deploymentId = response.data.id

    spinner.start('Connecting to socket...')
    const pusher = await this.pusher()

    await new Promise<void>((resolve) => {
      pusher.connection.bind('state_change', (states) => {
        switch (states.current) {
          case 'connected':
            resolve()
            break
          default:
            console.log('current state', states.current)
        }
      })
    })

    pusher.connection.bind('error', (error) => console.log('err', error))

    spinner.succeed('Connection successful')
    const channel = pusher.subscribe(`private-${pipeline.developerId as string}`)
    channel.subscribe()

    const taskSpinners = new Multispinner(['DOWNLOAD_SOURCE', 'INSTALL', 'BUILD', 'DEPLOY'])

    this.writeLine('Watching deployment stream...')

    channel.bind('pipeline-runner-update', (event) => {
      if (event.id !== deploymentId) {
        console.log('ignoring deployment I dont care about')
        return
      }
      this.updateTaskSpinners(event, taskSpinners)

      if (event.buildStatus === 'IN_PROGRESS') {
        // Do nothing. continuing in progress
      } else if (event.buildStatus === 'SUCCEEDED') {
        console.log(chalk.green('Deployment successful'))
        // wait before exiting?
        process.exit(0)
      } else {
        // TODO resolve other status'
      }
    })
  }

  updateTaskSpinners(event, taskSpinners: Multispinner) {
    event.tasks.forEach((task) => {
      switch (task.buildStatus) {
        case 'IN_PROGRESS':
          taskSpinners.changeState(task.functionName, SpinnerState.IN_PROGRESS)
          break
        case 'SUCCEEDED':
          taskSpinners.changeState(task.functionName, SpinnerState.SUCCESS)
          break
        case 'FAILED':
          taskSpinners.changeState(task.functionName, SpinnerState.FAIL)
          break
      }
    })
  }
}
