import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import {
  color,
  space,
  fontWeight,
  transition,
  radius,
  device,
} from '../../theme'
import {
  CloseRounded,
  InfoRounded,
  WarningRounded,
  CheckmarkRounded,
  ChevronRight,
} from '@ticketswap/comets'

const textColor = (props: { variant: string }) => css`
  color: ${props.variant === 'success'
    ? color.titan
    : props.variant === 'error'
    ? color.mars
    : props.variant === 'warning'
    ? color.sun
    : color.earth};
`

const Container = styled.div`
  background-color: ${props =>
    props.variant === 'success'
      ? color.titanLightest
      : props.variant === 'error'
      ? color.marsLightest
      : props.variant === 'warning'
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
`

type MessageProps = {
  primaryAction: boolean
}

const Message = styled.p`
  color: ${color.space};
  margin-top: ${10 / 16}rem;
  margin-bottom: ${10 / 16}rem;
  padding-right: ${(props: MessageProps) =>
    !props.primaryAction ? space[16] : 0};

  @media ${device.tablet} {
    margin-top: ${14 / 16}rem;
    margin-bottom: ${14 / 16}rem;
  }
`

const PrimaryAction = styled.button`
  ${textColor};
  outline: 0;
  font-weight: ${fontWeight.bold};
  flex-shrink: 0;
  padding-top: ${10 / 16}rem;
  padding-bottom: ${10 / 16}rem;
  padding-left: ${space[16]};
  padding-right: ${space[16]};
  transition: color ${transition};

  @media ${device.tablet} {
    padding-top: ${14 / 16}rem;
    padding-bottom: ${14 / 16}rem;
  }

  &:focus {
    box-shadow: none;
  }

  &:hover,
  &:focus {
    color: ${props =>
      props.variant === 'success'
        ? color.titanLight
        : props.variant === 'error'
        ? color.marsLight
        : props.variant === 'warning'
        ? color.sunLight
        : color.earthLight};
  }
`

const SecondaryAction = styled.button`
  color: ${color.space};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${10 / 16}rem;
  outline: 0;

  @media ${device.tablet} {
    margin-bottom: ${14 / 16}rem;
  }

  &:focus {
    box-shadow: none;
  }
`

const SecondaryActionAdornment = styled.span`
  position: relative;
  display: inline-block;
  padding-left: ${space[4]};
  top: -1px;
  transition: transform ${transition};

  ${SecondaryAction}:hover &,
  ${SecondaryAction}:focus & {
    transform: translate3d(0.25rem, 0, 0);
  }
`

interface AlertProps {
  variant: string
  children: any
  primaryAction?: {
    label: string
    onClick: any
  }
  secondaryAction?: {
    label: string
    onClick: any
  }
}

export const Alert = (props: AlertProps) => {
  return (
    <Container {...props}>
      <Adornment variant={props.variant}>
        {props.variant === 'success' ? (
          <CheckmarkRounded size={24} />
        ) : props.variant === 'error' ? (
          <CloseRounded size={24} />
        ) : props.variant === 'warning' ? (
          <WarningRounded size={24} />
        ) : (
          <InfoRounded size={24} />
        )}
      </Adornment>
      <Main>
        <Message primaryAction={Boolean(props.primaryAction)}>
          {props.children}
        </Message>
        {props.secondaryAction && (
          <SecondaryAction onClick={props.secondaryAction.onClick}>
            {props.secondaryAction.label}
            <SecondaryActionAdornment>
              <ChevronRight size={16} />
            </SecondaryActionAdornment>
          </SecondaryAction>
        )}
      </Main>
      {props.primaryAction && (
        <PrimaryAction
          variant={props.variant}
          onClick={props.primaryAction.onClick}
        >
          {props.primaryAction.label}
        </PrimaryAction>
      )}
    </Container>
  )
}

Alert.defaultProps = {
  variant: 'info',
}
