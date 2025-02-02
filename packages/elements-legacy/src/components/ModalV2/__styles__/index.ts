import { css } from '@linaria/core'

export const modalContainer = css`
  .rc-dialog-content {
    box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.12);
  }
  .rc-dialog-header {
    background-color: #f5f5f5;
    padding: 0;
    text-align: center;
    font-size: 20px;
    border: none;
  }
  .rc-dialog-footer {
    border-top: none;
    background: $white;
    padding: 1.5rem;
  }

  .rc-dialog-close {
    opacity: 1;
  }
  .rc-dialog-close:focus {
    outline: none;
  }
`
export const modalCentered = css`
  display: flex;
  align-items: center;
  justify-content: center;
`
// same styles as our .container class
export const modalResponsiveContainer = css`
  max-height: 100vh;

  @media screen and (min-width: 1024px) {
    width: 960px;
  }

  @media screen and (min-width: 1216px) {
    width: 1152px;
  }

  @media screen and (min-width: 1408px) {
    width: 1344px;
  }
`

export const modalNoPadding = css`
  .rc-dialog-body {
    padding: 0;
  }
`

export const modalNoHeader = css`
  .rc-dialog-header,
  .rc-dialog-close {
    display: none;
  }
`
