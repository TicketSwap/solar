import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
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
} from '../../icons'
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
  variant?: keyof typeof AlertVariant
  children: ReactNode
}

const textColor = (props: AlertProps) => css`
  color: ${props.variant === AlertVariant.success
    ? color.success
    : props.variant === AlertVariant.error
    ? color.failure
    : props.variant === AlertVariant.warning
    ? color.warning
    : color.info};
`

const Container = styled.div<AlertProps>`
  background-color: ${props =>
    props.variant === AlertVariant.success
      ? color.successBackground
      : props.variant === AlertVariant.error
      ? color.failureBackground
      : props.variant === AlertVariant.warning
      ? color.warningBackground
      : color.infoBackground};
  border-radius: ${radius.md};
  min-block-size: ${space[44]};
  display: flex;
  align-items: flex-start;

  @media ${device.tablet} {
    min-block-size: ${space[56]};
  }

  a {
    ${textColor};
  }
`

const Adornment = styled.span`
  ${textColor};
  inline-size: ${space[44]};
  block-size: ${space[44]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media ${device.tablet} {
    inline-size: ${space[56]};
    block-size: ${space[56]};
  }
`

const Main = styled.div`
  flex-basis: 100%;
  padding-block: ${11 / 16}rem ${10 / 16}rem;
  padding-inline: 0 ${10 / 16}rem;

  @media ${device.tablet} {
    padding-block: ${15 / 16}rem ${14 / 16}rem;
    padding-inline: 0 ${14 / 16}rem;
  }
`

const Title = styled(H4)`
  line-height: ${lineHeight.title};
  font-weight: ${fontWeight.semiBold};
  margin-block-end: ${6 / 16}rem;

  @media ${device.tablet} {
    line-height: 1.4;
  }
`

const Message = styled.p`
  color: ${color.foreground};
  margin-block: 0;
  margin-inline: 0;
`

const Action = styled.button`
  ${textColor};
  outline: 0;
  font-weight: ${fontWeight.semiBold};
  flex-shrink: 0;
  transition: color ${transition};
  margin-block-start: ${6 / 16}rem;

  @media ${device.tablet} {
    margin-block-start: ${6 / 16}rem;
  }

  &:focus {
    box-shadow: none;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
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
