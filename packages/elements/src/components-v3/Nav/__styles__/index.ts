import { css } from 'linaria'
import { styled } from 'linaria/react'
import { colorBlueLight } from '../../../styles-v3/base/variables'

const chevronRight = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L8.8012 0C10.5501 0 13.0962 2.1362 12.6186 2.80527L17.6261 18.8053C17.8695 19.5832 17.8695 20.4168 17.6261 21.1947L12.6186 37.1947C12.0962 38.8638 10.5501 40 8.8012 40H0V0Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`

export const ElNavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--color-blue-dark);
  height: auto;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;

  @media screen and (min-width: 768px) {
    height: 100%;
    width: 80px;
    overflow-x: hidden;
    overflow-y: auto;
  }
`

export const ElNavSubContainer = styled.div`
  background-color: var(--color-blue-dark2);
`

export const ElNavItem = styled.a`
  font-family: var(--font-sans-serif);
  color: var(--color-white);
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  height: 0;
  padding: 0 0.75rem;
  opacity: 0;
  transition: height 0.3s linear, opacity 0.3s linear, padding-top 0.3s linear, padding-bottom 0.3s linear;

  svg {
    margin-right: 0.5rem;
    height: 2rem;
  }

  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue-dark2);
  }

  &:first-child {
    height: 48px;
    opacity: 1;
    padding: 0;
    background-color: var(--color-blue-dark);
  }

  @media screen and (min-width: 768px) {
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    height: 72px;
    align-items: center;
    padding: 0.5rem;
    opacity: 1;

    svg {
      margin-right: 0;
    }

    &:first-child {
      height: 72px;

      &:hover {
        background-color: var(--color-blue-dark2);
      }
    }
  }
`

export const elNavItemActive = css`
  @media screen and (min-width: 768px) {
    color: var(--color-white);
    background-color: var(--color-blue-dark2);
  }
`

export const elNavItemExpanded = css`
  @media screen and (max-width: 767px) {
    height: 48px;
    opacity: 1;
    padding: 0.5rem 0.75rem;
  }
`

export const elNavItemHideDesktop = css`
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const elNavItemIcon = css`
  @media screen and (max-width: 767px) {
    margin-left: 0.75rem;
  }
`

export const ElNavSubItem = styled.a`
  height: 0;
  font-family: var(--font-sans-serif);
  color: var(--color-white);
  opacity: 0;
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s linear;
  padding: 0;
  margin-left: 3.25rem;

  * {
    padding: 0.2rem 0.5rem;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const elNavSubItemExpanded = css`
  @media screen and (max-width: 767px) {
    height: 32px;
    width: 100%;
    padding-bottom: 0;
    opacity: 1;

    &:hover {
      color: var(--color-white);
    }

    &:last-child {
      padding-bottom: 0.25rem;
    }

    &:first-child {
      padding-top: 0.25rem;
    }
  }
`

export const elNavSubItemActive = css`
  * {
    display: flex;
    flex-shrink: 1;
    border-radius: 0.25rem;
    background-repeat: no-repeat;
    background-image: linear-gradient(to right, var(--color-blue-light), var(--color-blue-light));
    outline-color: var(--color-blue-dark);
    background-size: calc(100% - 1rem);
    background-position-x: left;
    padding-right: 1.5rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 26px;
      width: 100%;
      top: 0;
      right: 6px;
      background-image: url('${chevronRight(colorBlueLight)}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: right;
    }
  }
`

export const elNavItemSecondary = css`
  @media screen and (min-width: 768px) {
    margin-top: auto;
  }
`
