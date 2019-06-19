import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Spinner } from '../Spinner'
import { VisuallyHidden } from '../VisuallyHidden'
import {
  color,
  space,
  shadow,
  transition,
  fontSize,
  lineHeight,
  radius,
  device,
} from '../../theme'
import { CloseRounded } from '@ticketswap/comets'

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Field = styled.input`
  font-family: inherit;
  background-color: ${props =>
    props.invalid ? color.marsLightestAlpha : color.stardust};
  border-radius: ${props => (props.rounded ? space[32] : radius.md)};
  width: 100%;
  font-size: ${fontSize[18]};
  line-height: ${props =>
    props.as === 'textarea' ? lineHeight.copy : lineHeight.solid};
  height: ${props => (props.as === 'textarea' ? 'auto' : space[56])};
  padding-top: ${props => (props.as === 'textarea' ? space[12] : 0)};
  padding-bottom: ${props => (props.as === 'textarea' ? space[12] : 0)};
  padding-left: ${props => (props.leftAdornment ? space[48] : space[16])};
  padding-right: ${props =>
    (props.value && props.value.length && props.onReset) ||
    props.loading ||
    props.rightAdornment
      ? space[48]
      : space[16]};
  color: ${color.space};
  box-shadow: none;
  border: 0;
  text-align: left;
  appearance: none;
  transition: box-shadow ${transition}, background-color ${transition};
  -webkit-font-smoothing: auto;

  ${props =>
    props.as === 'textarea' &&
    css`
      resize: vertical;
      min-height: ${space[96]};
    `};

  &[type='search']::-webkit-search-decoration {
    appearance: none;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button,
  &[type='time']::-webkit-inner-spin-button,
  &[type='date']::-webkit-clear-button,
  &[type='date']::-webkit-inner-spin-button,
  &[type='date']::-webkit-calendar-picker-indicator {
    appearance: none;
    display: none;
  }

  &:focus,
  &.focus {
    outline: none;
    box-shadow: ${shadow.strong};
    background-color: ${props =>
      props.invalid ? color.marsLightestAlpha : 'white'};
  }

  &::placeholder {
    color: ${color.spaceLight};
  }

  &.invalid {
    color: ${color.mars} !important;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`

export const Label = styled.label`
  position: relative;
  display: block;
`

export const LabelText = styled.span`
  display: inline-block;
  color: ${color.spaceMedium};
  margin-bottom: ${space[4]};
`

export const Adornment = styled.span`
  position: absolute;
  z-index: 1;
  top: 0;
  color: ${color.spaceMedium};
  left: ${props => (props.left ? 0 : 'auto')};
  right: ${props => (props.right ? 0 : 'auto')};
  bottom: 0;
  width: ${space[48]};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: color ${transition};

  ${Label}:focus-within & {
    color: ${color.space};
  }
`

Adornment.defaultProps = { className: 'adornment' }

const ResetButton = styled.button`
  line-height: 0;
  opacity: 0.35;
  transition: opacity ${transition};

  &:hover,
  &:focus {
    opacity: 0.5;
    outline: 0;
  }
`

export const Help = styled.p`
  font-size: ${fontSize[14]};
  margin-bottom: 0;
  margin-top: ${6 / 16}rem;
  color: ${color.spaceLight};

  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`

export const Input = React.forwardRef(
  ({ id, label, hideLabel, labelProps, validate, ...props }, ref) => {
    const invalid =
      typeof validate === 'undefined'
        ? false
        : typeof validate === 'function'
        ? !validate(props.value)
        : !validate

    return (
      <Label htmlFor={!labelProps && id} {...labelProps}>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelText>{label}</LabelText>
          </VisuallyHidden>
        ) : (
          <LabelText>{label}</LabelText>
        )}
        <InputWrapper>
          {props.leftAdornment ? (
            <Adornment left>{props.leftAdornment}</Adornment>
          ) : null}
          <Field ref={ref} id={id} invalid={invalid} {...props} />
          {props.loading ? (
            <Adornment right>
              <Spinner size={24} />
            </Adornment>
          ) : props.value && props.value.length && props.onReset ? (
            <Adornment right>
              <ResetButton
                onClick={props.onReset}
                type="button"
                data-testid="reset-button"
              >
                <CloseRounded size={16} />
              </ResetButton>
            </Adornment>
          ) : props.rightAdornment ? (
            <Adornment right>{props.rightAdornment}</Adornment>
          ) : null}
          {props.menu && props.menu}
        </InputWrapper>
        {props.help && <Help>{props.help}</Help>}
      </Label>
    )
  }
)

Input.defaultProps = {
  type: 'text',
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  labelProps: PropTypes.object,
  leftAdornment: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onReset: PropTypes.func,
  placeholder: PropTypes.string,
}
