import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, space, fontWeight, transition, radius } from '../../theme'
import { Icon } from '../Icon'

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
  min-height: ${space[56]};
  display: flex;
  align-items: flex-start;
`

const textColor = css`
  color: ${props =>
    props.variant === 'success'
      ? color.titan
      : props.variant === 'error'
      ? color.mars
      : props.variant === 'warning'
      ? color.sun
      : color.earth};
`

const Adornment = styled.span`
  ${textColor};
  width: ${space[64]};
  height: ${space[56]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`

const Main = styled.div`
  flex-basis: 100%;
`

const Message = styled.p`
  color: ${color.space};
  padding-top: ${space[16]};
  padding-bottom: ${space[16]};
  padding-right: ${props => (!props.primaryAction ? space[16] : 0)};
`

const PrimaryAction = styled.button`
  ${textColor};
  outline: 0;
  font-weight: ${fontWeight.bold};
  flex-shrink: 0;
  padding: ${space[16]};
  transition: color ${transition};

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
  margin-bottom: ${space[16]};
  outline: 0;

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
        <Icon
          glyph={
            props.variant === 'success'
              ? 'checkmark-solid'
              : props.variant === 'error'
              ? 'error-solid'
              : props.variant === 'warning'
              ? 'warning-solid'
              : 'info-solid'
          }
        />
      </Adornment>
      <Main>
        <Message primaryAction={props.primaryAction}>{props.children}</Message>
        {props.secondaryAction && (
          <SecondaryAction onClick={props.secondaryAction.onClick}>
            {props.secondaryAction.label}
            <SecondaryActionAdornment>
              <Icon glyph="arrow-right-solid" size={16} />
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
}

Alert.defaultProps = {
  variant: 'info',
}
