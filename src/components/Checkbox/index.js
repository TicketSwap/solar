import React from 'react'
import styled from '@emotion/styled'
import { Checkmark } from '@ticketswap/comets'
import { space, color, radius } from '../../theme'
import { VisuallyHidden } from '../VisuallyHidden'

const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
`

const LabelText = styled.span`
  display: inline-block;
  color: ${color.spaceMedium};
  margin-left: ${space[8]};
`

const NativeCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const CustomCheckbox = styled.div`
  position: relative;
  color: white;
  line-height: 1;
  width: ${space[24]};
  height: ${space[24]};
  background-color: ${props =>
    props.checked ? color.earth : color.spaceLightest};
  border-radius: ${radius.sm};
  transition: background-color 150ms ease-out;
  cursor: pointer;

  ${NativeCheckbox}:focus + &,
  ${NativeCheckbox}:active + & {
    outline: 0;
    box-shadow: 0 0 0 ${space[4]} ${color.earthFocusAlpha};
    background-color: ${props =>
      props.checked ? color.earth : color.stardust};
  }
`

const IconContainer = styled.span`
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

export const Checkbox = React.forwardRef(
  ({ className, defaultOn, onChange, label, hideLabel, ...props }, ref) => {
    const [on, setOn] = React.useState(defaultOn || false)
    const isOnControlled = () => props.on !== undefined
    const getOn = () => (isOnControlled() ? props.on : on)

    return (
      <Label htmlFor={props.id} className={className}>
        <NativeCheckbox
          type="checkbox"
          ref={ref}
          checked={getOn()}
          {...props}
          onChange={e => {
            if (!isOnControlled()) {
              setOn(e.target.checked)
              onChange(e)
            }
          }}
        />
        <CustomCheckbox checked={getOn()}>
          {getOn() && (
            <IconContainer>
              <Checkmark size={20} />
            </IconContainer>
          )}
        </CustomCheckbox>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelText>{label}</LabelText>
          </VisuallyHidden>
        ) : (
          <LabelText>{label}</LabelText>
        )}
      </Label>
    )
  }
)

Checkbox.defaultProps = {
  onChange: () => {},
}
