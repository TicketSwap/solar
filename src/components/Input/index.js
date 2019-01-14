import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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

const FieldWrapper = styled.div`
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    pointer-events: none;
    width: ${space[96]};
    position: absolute;
    border-radius: ${space[32]};
    top: 1px;
    right: 1px;
    bottom: 1px;
    transition: opacity ${transition};
    display: ${props => (props.showTextMask ? 'block' : 'none')};
  }

  &::before {
    opacity: 1;
    background-image: linear-gradient(
      to right,
      rgba(245, 245, 246, 0),
      rgba(245, 245, 246, 1) 50%,
      rgba(245, 245, 246, 1) 100%
    );
  }

  &::after {
    opacity: 0;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  &:focus-within::after {
    opacity: 1;
  }
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
  padding-right: ${space[16]};
  color: ${props => (props.invalid ? color.mars : color.space)};
  border: 1px solid ${color.stardust};
  box-shadow: none;
  text-align: left;
  appearance: none;
  transition: box-shadow ${transition}, background-color ${transition};
  -webkit-font-smoothing: auto;

  &:focus,
  &.focus {
    outline: none;
    background-color: white;
    box-shadow: ${shadow.strong};
  }

  &::placeholder {
    color: ${color.spaceLighter};
  }

  &.invalid {
    color: ${color.mars} !important;
  }

  ::-webkit-search-cancel-button {
    display: none;
  }

  :-webkit-autofill,
  &.webkit-autofill {
    background-color: ${color.stardust} !important;
    border: 1px solid ${color.stardust} !important;
  }
`

const Label = styled.label`
  position: relative;
`

const LabelText = styled.span`
  display: inline-block;
  color: ${color.spaceMedium};
  margin-bottom: ${space[8]};
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
  ({ id, label, hideLabel, labelProps, onReset, ...props }, ref) => (
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
        <FieldWrapper showTextMask={props.loading || onReset}>
          <Field ref={ref} id={id} {...props} />
        </FieldWrapper>
        {props.loading ? (
          <Adornment right>
            <Spinner size={24} />
          </Adornment>
        ) : props.value && props.value.length && onReset ? (
          <Adornment right>
            <ResetButton
              onClick={onReset}
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
