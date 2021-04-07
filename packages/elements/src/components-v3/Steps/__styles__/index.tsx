import { styled } from 'linaria/react'
import { elIsActive, elIsUsed } from '../../../styles-v3/base/states'

export const ElSteps = styled.div`
  display: flex;
`
export const ElStep = styled.div`
  background-color: var(--intent-primary);
  color: var(--color-white);
  font-weight: bold;
  font-size: 1rem;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 var(--component-steps-gutter-width);
  margin-top: 0.25rem;
  transition: 0.3s;
  transform-origin: top;
  cursor: pointer;

  &${elIsUsed} {
    background-color: var(--intent-secondary);
  }

  &${elIsActive} {
    margin-top: 0rem;
    font-size: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--intent-critical);
  }

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    width: var(--component-steps-gutter-width);
    height: 1.5px;
    background: var(--color-grey-medium);
  }

  &:before {
    left: calc(var(--component-steps-gutter-width) * -1);
  }

  &:after {
    right: calc(var(--component-steps-gutter-width) * -1);
  }

  &:first-child {
    margin-left: 0;

    &:before {
      display: none;
    }
  }

  &:last-child {
    margin-right: 0;

    &:after {
      display: none;
    }
  }
`
