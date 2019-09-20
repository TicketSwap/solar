import React from 'react'
import PropTypes from 'prop-types'
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

const textColor = props => css`
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
  padding: ${10 / 16}rem ${10 / 16}rem ${10 / 16}rem 0;

  @media ${device.tablet} {
    padding: ${14 / 16}rem ${14 / 16}rem ${14 / 16}rem 0;
  }
`

const Message = styled.p`
  color: ${color.space};
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
      props.variant === 'success'
        ? color.titanLight
        : props.variant === 'error'
        ? color.marsLight
        : props.variant === 'warning'
        ? color.sunLight
        : color.earthLight};
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
  outline: 0;
  margin-top: ${6 / 16}rem;

  @media ${device.tablet} {
    margin-top: ${6 / 16}rem;
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

export const Alert = props => {
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
        <Message primaryAction={props.primaryAction}>{props.children}</Message>
        {props.action && (
          <Action variant={props.variant} onClick={props.action.onClick}>
            {props.action.label}
          </Action>
        )}
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

Alert.propTypes = {
  variant: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  primaryAction: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
  secondaryAction: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
  action: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
}

Alert.defaultProps = {
  variant: 'info',
}
