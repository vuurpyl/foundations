import React from 'react'
import { H5, Grid, GridItem, Content } from '@reapit/elements-legacy'
import { link, linkNormal } from '@/styles/elements/link'
import { cx } from '@linaria/core'

export type ContactDeveloperSectionType = {
  contact: {
    developer?: string
    telephone?: string
    supportEmail?: string
    homePage?: string
    pricingUrl?: string
    isFree?: boolean
    termsAndConditionsUrl?: string
    privacyPolicyUrl?: string
  }
  hasGutter?: boolean
}

export const ContactDeveloperSection = ({
  contact: {
    developer,
    telephone,
    supportEmail,
    homePage,
    isFree,
    privacyPolicyUrl,
    pricingUrl,
    termsAndConditionsUrl,
  },
}: ContactDeveloperSectionType) => {
  return (
    <>
      <Content>
        <H5 className={'mb-2'}>Developer Links</H5>
        <Grid>
          <GridItem>
            <p>{developer}</p>
          </GridItem>
        </Grid>
        {telephone && (
          <Grid>
            <GridItem>
              <p>{telephone}</p>
            </GridItem>
          </Grid>
        )}
        {supportEmail && (
          <Grid>
            <GridItem>
              <p>
                <a
                  className={cx(link, linkNormal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:${supportEmail}`}
                >
                  Support
                </a>
              </p>
            </GridItem>
          </Grid>
        )}
        {homePage && (
          <Grid>
            <GridItem>
              <p>
                <a className={cx(link, linkNormal)} href={homePage} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </p>
            </GridItem>
          </Grid>
        )}
        {!isFree && pricingUrl && (
          <Grid>
            <GridItem>
              <p>
                <a className={cx(link, linkNormal)} href={pricingUrl} target="_blank" rel="noopener noreferrer">
                  Pricing
                </a>
              </p>
            </GridItem>
          </Grid>
        )}
        {privacyPolicyUrl && (
          <Grid>
            <GridItem>
              <p>
                <a className={cx(link, linkNormal)} href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </p>
            </GridItem>
          </Grid>
        )}
        {termsAndConditionsUrl && (
          <Grid>
            <GridItem>
              <p>
                <a
                  className={cx(link, linkNormal)}
                  href={termsAndConditionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </p>
            </GridItem>
          </Grid>
        )}
      </Content>
    </>
  )
}
