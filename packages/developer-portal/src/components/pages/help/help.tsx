import * as React from 'react'
import { openChatbot } from '../../../scripts/chat-bot'
import { H3 } from '@reapit/elements-legacy'
import { HelpLinks } from '@/constants/developer-help-links'
import requestEndpointImg from '@/assets/images/help/request-endpoint.jpg'
import reportBugImg from '@/assets/images/help/report-bugs.jpg'
import liveChatImg from '@/assets/images/help/live-chat.jpg'
import roadmapImg from '@/assets/images/help/time-line.jpg'
import whatNewImg from '@/assets/images/help/what-new.png'
import HelpItemList, { HelpItem } from '@/components/ui/help-item-list'

import { selectLoginIdentity } from '@/selector/auth'
import { LoginIdentity, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const handleReportBug = () => {
  window.open(HelpLinks.BUG_REPORT, '_blank')
}

export const handleRequestEndpoint = () => {
  window.open(HelpLinks.API_REQUEST, '_blank')
}

export const handleViewRoadmap = () => {
  window.open(HelpLinks.ROADMAP, '_blank')
}

export const handleWhatsNew = () => {
  window.open(HelpLinks.WHATS_NEW, '_blank')
}

export const handleFaq = (loginIdentity: LoginIdentity) => {
  openChatbot(loginIdentity)
}

export const helpItems = (loginIdentity: LoginIdentity): HelpItem[] => {
  const items = [
    {
      imgSrc: requestEndpointImg,
      header: 'Request a Feature',
      text: `Use this form to request a feature in either the Marketplace or Foundations API. Please note, we will
      look at all requests carefully however, we cannot guarantee all will be implemented.`,
      buttonText: 'REQUEST',
      buttonOnClick: handleRequestEndpoint,
    },
    {
      imgSrc: reportBugImg,
      header: 'Report a Bug',
      text: 'Please report details of any bugs in relation to the Reapit Developer portal or Reapit Foundations API here. ',
      buttonText: 'REPORT',
      buttonOnClick: handleReportBug,
    },
    {
      imgSrc: roadmapImg,
      header: 'Roadmap',
      text: `Want to see what we are building or check on the progress of your feature requests?
      You can see our product roadmap milestones here. `,
      buttonText: 'VIEW',
      buttonOnClick: handleViewRoadmap,
    },
    {
      imgSrc: whatNewImg,
      header: 'What’s New',
      text: `We are constantly working to improve your experience with the Foundations Platform. Have a look to see what
      new features and fixes have been released.`,
      buttonText: 'VIEW',
      buttonOnClick: handleWhatsNew,
    },
  ]

  if (loginIdentity.developerId && window.reapit.config.liveChatWhitelist.includes(loginIdentity.developerId)) {
    const liveChatItem = {
      imgSrc: liveChatImg,
      header: 'Need Help?',
      text:
        'If you have a question that is not covered in the documentation you can ask here. Please note ' +
        'we don’t provide chat support for Agency Cloud Developer Edition.',
      buttonText: 'START CHAT',
      buttonOnClick: () => handleFaq(loginIdentity),
    }
    items.splice(4, 0, liveChatItem)
  }

  return items
}

export type DeveloperHelpPageProps = {}

export const DeveloperHelpPage: React.FC<DeveloperHelpPageProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)

  return (
    <>
      <H3>Help</H3>
      <HelpItemList items={helpItems(loginIdentity)} />
    </>
  )
}

export default DeveloperHelpPage
