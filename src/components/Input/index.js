import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Icon } from '../Icon'
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
} from '../../theme'

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Field = styled.input`
  font-family: inherit;
  background-color: ${color.stardust};
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
    (props.value && props.value.length && props.onReset) || props.loading
      ? space[48]
      : space[16]};
  color: ${props => (props.invalid ? color.mars : color.space)};
  border: 1px solid ${color.stardust};
  box-shadow: none;
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

  &:focus,
  &.focus {
    outline: none;
    background-color: white;
    box-shadow: ${shadow.strong};
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

const Label = styled.label`
  position: relative;
  display: block;
`

const LabelText = styled.span`
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
`

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

export const Input = React.forwardRef(
  ({ id, label, hideLabel, labelProps, ...props }, ref) => (
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
        <Field ref={ref} id={id} {...props} />
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
              <Icon glyph="close-circle-solid" size={16} />
            </ResetButton>
          </Adornment>
        ) : null}
      </InputWrapper>
    </Label>
  )
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
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  placeholder: PropTypes.string,
}
