import React from 'react'
import { cx } from '@linaria/core'
import { tag } from '../__styles__/app-detail'

import { H5, Content } from '@reapit/elements-legacy'

interface AppDetailSectionProps {
  headerText: string | React.ReactNode
  dataTest?: string
  isSidebar?: boolean
}

interface ImageSectionProps {
  uri?: string
  alt?: string
}

export const AppDetailSection: React.FC<AppDetailSectionProps> = ({
  headerText,
  children,
  dataTest = '',
  isSidebar = false,
}) => (
  <Content dataTest={dataTest}>
    <H5 className={isSidebar ? 'mb-2' : ''}>{headerText}</H5>
    {children}
  </Content>
)

export const Tag: React.FC<{ className?: string }> = ({ children, className }) => (
  <div className={cx(tag, className)}>{children}</div>
)

export const ImageSection: React.FC<ImageSectionProps> = ({ uri, alt = '' }) => {
  return uri ? (
    <Content className="flex justify-center items-center">
      <img src={uri} alt={alt} />
    </Content>
  ) : null
}
