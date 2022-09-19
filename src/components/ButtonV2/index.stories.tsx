import React, { Fragment, useState } from 'react'
import { Button, ButtonSize, ButtonVariant, ButtonWeight } from '.'
import { Alert } from '../../icons'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Spinner } from '../Spinner'

const VARIANTS = [
  ButtonVariant.primary,
  ButtonVariant.success,
  ButtonVariant.danger,
]

const PresentationalWrapper = styled.div`
  :not(:last-of-type) {
    margin-block-end: ${space[16]};
  }

  *:not(:last-of-type) {
    margin-inline-end: ${space[16]};
  }

  a {
    margin-inline-start: ${space[16]};
  }

  display: flex;
  align-items: center;
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

export const withLightWeight = () => (
  <>
    {VARIANTS.map(variant => (
      <Fragment key={variant}>
        <p>{`${variant.charAt(0).toUpperCase()}${variant.slice(1)}`}</p>
        <PresentationalWrapper>
          <Button
            size={ButtonSize.small}
            variant={variant}
            weight={ButtonWeight.outlined}
          >
            Small link
          </Button>
          <Button
            size={ButtonSize.medium}
            variant={variant}
            weight={ButtonWeight.outlined}
          >
            Medium link
          </Button>
          <Button
            size={ButtonSize.large}
            variant={variant}
            weight={ButtonWeight.outlined}
          >
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
          <Button variant={variant} startAdornment={<Spinner size={24} />}>
            Loading
          </Button>
        </PresentationalWrapper>
      </Fragment>
    ))}
  </>
)

export const WithAdornment = () => (
  <>
    <PresentationalWrapper>
      <Button size={ButtonSize.small} startAdornment={<Alert size={16} />}>
        Small link
      </Button>
      <Button size={ButtonSize.medium} startAdornment={<Alert size={16} />}>
        Medium link
      </Button>
      <Button size={ButtonSize.large} startAdornment={<Alert size={24} />}>
        Large link
      </Button>
    </PresentationalWrapper>
  </>
)

export const FullWidth = () => (
  <Button
    size={ButtonSize.large}
    startAdornment={<Alert size={24} />}
    fullWidth
  >
    Full width
  </Button>
)

export const WithSquare = () => (
  <PresentationalWrapper>
    <Button size={ButtonSize.small} variant={ButtonVariant.primary} square>
      <Alert size={16} />
    </Button>
    <Button size={ButtonSize.medium} variant={ButtonVariant.primary} square>
      <Alert size={16} />
    </Button>
    <Button size={ButtonSize.large} variant={ButtonVariant.primary} square>
      <Alert size={24} />
    </Button>
  </PresentationalWrapper>
)

export const WithLoading = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <PresentationalWrapper>
        <Button
          onClick={prev => setIsLoading(prev => !prev)}
          size={ButtonSize.small}
          startAdornment={
            isLoading ? <Spinner size={16} /> : <Alert size={16} />
          }
        >
          Click me
        </Button>
        <Button
          onClick={prev => setIsLoading(prev => !prev)}
          size={ButtonSize.medium}
          startAdornment={
            isLoading ? <Spinner size={16} /> : <Alert size={16} />
          }
        >
          Click me
        </Button>
        <Button
          onClick={prev => setIsLoading(prev => !prev)}
          size={ButtonSize.large}
          startAdornment={
            isLoading ? <Spinner size={24} /> : <Alert size={24} />
          }
        >
          Click me
        </Button>
      </PresentationalWrapper>
    </>
  )
}

export default {
  title: 'Components/Actions/ButtonV2',
}
