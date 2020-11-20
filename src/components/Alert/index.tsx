import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import {
  color,
  space,
  fontWeight,
  transition,
  radius,
  device,
  lineHeight,
} from '../../theme'
import {
  CloseRounded,
  InfoRounded,
  WarningRounded,
  CheckmarkRounded,
} from '@ticketswap/comets'
import { H4 } from '../Heading'

export type AlertAction = {
  label: string
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

export enum AlertVariant {
  info = 'info',
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export interface AlertProps {
  title?: string
  action?: AlertAction
  variant?: AlertVariant
}

const textColor = (props: AlertProps) => css`
  color: ${props.variant === AlertVariant.success
    ? color.titan
    : props.variant === AlertVariant.error
    ? color.mars
    : props.variant === AlertVariant.warning
    ? color.sun
    : color.earth};
`

const Container = styled.div<AlertProps>`
  background-color: ${props =>
    props.variant === AlertVariant.success
      ? color.titanLightest
      : props.variant === AlertVariant.error
      ? color.marsLightest
      : props.variant === AlertVariant.warning
      ? color.sunLightest
      : color.earthLightest};
  border-radius: ${radius.md};
  min-height: ${space[44]};
  display: flex;
  align-items: flex-start;

  @media ${device.tablet} {
    min-height: ${space[56]};
  }

  a {
    ${textColor};
  }
`

const Adornment = styled.span`
  ${textColor};
  width: ${space[44]};
  height: ${space[44]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media ${device.tablet} {
    width: ${space[56]};
    height: ${space[56]};
  }
`

const Main = styled.div`
  flex-basis: 100%;
  padding: ${11 / 16}rem ${10 / 16}rem ${10 / 16}rem 0;

  @media ${device.tablet} {
    padding: ${15 / 16}rem ${14 / 16}rem ${14 / 16}rem 0;
  }
`

const Title = styled(H4)`
  line-height: ${lineHeight.title};
  font-weight: ${fontWeight.semiBold};
  margin-bottom: ${6 / 16}rem;

  @media ${device.tablet} {
    line-height: 1.4;
  }
`

const Message = styled.p`
  color: ${color.space};
  margin: 0;
`

const Action = styled.button`
  ${textColor};
  outline: 0;
  font-weight: ${fontWeight.bold};
  flex-shrink: 0;
  transition: color ${transition};
  margin-top: ${6 / 16}rem;

  @media ${device.tablet} {
    margin-top: ${6 / 16}rem;
  }

  &:focus {
    box-shadow: none;
  }

  &:hover,
  &:focus {
    color: ${props =>
      props.variant === AlertVariant.success
        ? color.titanLight
        : props.variant === AlertVariant.error
        ? color.marsLight
        : props.variant === AlertVariant.warning
        ? color.sunLight
        : color.earthLight};
  }
`

const Alert: React.FC<AlertProps> = ({
  title,
  action,
  children,
  variant = AlertVariant.info,
  ...props
}) => {
  return (
    <Container variant={variant} {...props}>
      <Adornment variant={variant}>
        {variant === AlertVariant.success ? (
          <CheckmarkRounded size={24} />
        ) : variant === AlertVariant.error ? (
          <CloseRounded size={24} />
        ) : variant === AlertVariant.warning ? (
          <WarningRounded size={24} />
        ) : (
          <InfoRounded size={24} />
        )}
      </Adornment>
      <Main>
        {/* Will be fixed in version 11 of emotion: https://github.com/emotion-js/emotion/pull/1874 */}
        {/* @ts-ignore */}
        {title && <Title as="h4">{title}</Title>}
        <Message>{children}</Message>
        {action && (
          <Action
            variant={variant}
            onClick={event => action.onClick(event)}
            type="button"
          >
            {action.label}
          </Action>
        )}
      </Main>
    </Container>
  )
}

export { Alert }
