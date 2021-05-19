import { table, autoGeneratedHashKey, attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations'
import { embed } from '@aws/dynamodb-data-mapper'
import { DeploymentStatus, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { TABLE_NAMES } from './../constants'
import { TaskModel } from './task.model'

@table(TABLE_NAMES.PIPELINE)
export class PipelineModel implements PipelineModelInterface {
  @autoGeneratedHashKey()
  id?: string

  @hashKey()
  deploymentId?: string

  @attribute({ defaultProvider: () => Date() })
  created?: string

  @attribute({ defaultProvider: () => Date() })
  modified?: string

  // @attribute({ defaultProvider: () => AppTypeEnum.NODE })
  // appType?: AppTypeEnum

  // @attribute()
  // buildCommand?: string = 'build'

  // @attribute({ defaultProvider: () => PackageManagerEnum.YARN })
  // packageManager?: PackageManagerEnum

  @attribute({ defaultProvider: () => DeploymentStatus.PENDING })
  buildStatus?: DeploymentStatus

  @attribute()
  S3Location?: string

  @attribute({ memberType: embed(TaskModel) })
  tasks?: TaskModel[] = []
}
