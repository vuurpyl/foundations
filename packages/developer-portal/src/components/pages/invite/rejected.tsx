import React from 'react'
import { ModalV2, Content } from '@reapit/elements-legacy'

export const RejectedModal = ({ visible }: { visible: boolean }) => {
  return (
    <ModalV2 visible={visible} closable={false} title="Invitation Declined" isCentered>
      <Content>
        <p>You have successfully declined the invitation to Reapit Foundations.</p>
      </Content>
    </ModalV2>
  )
}

export default RejectedModal
