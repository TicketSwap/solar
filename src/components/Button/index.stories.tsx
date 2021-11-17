import React, { Fragment } from 'react'
import { Button, ButtonSize, ButtonVariant } from '.'
import { Alert } from '../../icons'
import styled from '@emotion/styled'
import { space } from '../../theme'

const VARIANTS = [
  ButtonVariant.primary,
  ButtonVariant.secondary,
  ButtonVariant.caution,
  ButtonVariant.success,
  ButtonVariant.warning,
  ButtonVariant.danger,
  ButtonVariant.facebook,
  ButtonVariant.inverted,
  ButtonVariant.apple,
  ButtonVariant.google,
]

const PresentationalWrapper = styled.div`
  :not(:last-of-type) {
    margin-bottom: ${space[16]};
  }

  *:not(:last-of-type) {
    margin-right: ${space[16]};
  }

  a {
    margin-left: ${space[16]};
  }
`

export const WithVariants = () => (
  <>
    {VARIANTS.map(variant => (
      <Fragment key={variant}>
        <p>{`${variant.charAt(0).toUpperCase()}${variant.slice(1)}`}</p>
        <PresentationalWrapper>
          <Button size={ButtonSize.small} variant={variant}>
            Small link
          </Button>
          <Button size={ButtonSize.medium} variant={variant}>
            Medium link
          </Button>
          <Button size={ButtonSize.large} variant={variant}>
            Large link
          </Button>
        </PresentationalWrapper>
      </Fragment>
    ))}
  </>
)

export const WithStates = () => (
  <>
    {VARIANTS.map(variant => (
      <Fragment key={variant}>
        <p>{`${variant.charAt(0).toUpperCase()}${variant.slice(1)}`}</p>
        <PresentationalWrapper>
          <Button variant={variant}>Default</Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
          <Button variant={variant} loading>
            Loading
          </Button>
          <Button variant={variant} active>
            Active
          </Button>
          <Button as="a" href="/" variant={variant}>
            As anchor
          </Button>
        </PresentationalWrapper>
      </Fragment>
    ))}
  </>
)

export const WithAdornment = () => (
  <>
    <PresentationalWrapper>
      <Button size={ButtonSize.small} leftAdornment={<Alert size={16} />}>
        Small link
      </Button>
      <Button size={ButtonSize.medium} leftAdornment={<Alert size={16} />}>
        Medium link
      </Button>
      <Button size={ButtonSize.large} leftAdornment={<Alert size={24} />}>
        Large link
      </Button>
    </PresentationalWrapper>
    <PresentationalWrapper>
      <Button size={ButtonSize.small} leftAdornment={<Alert size={16} />} />
      <Button size={ButtonSize.medium} leftAdornment={<Alert size={16} />} />
      <Button size={ButtonSize.large} leftAdornment={<Alert size={24} />} />
    </PresentationalWrapper>
  </>
)

export default {
  title: 'Components/Actions/Button',
}
