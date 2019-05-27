import React from 'react'
import styled from '@emotion/styled'
import { Checkmark } from '@ticketswap/comets'
import { space, color, radius } from '../../theme'
import { VisuallyHidden } from '../VisuallyHidden'
import { usePrevious } from '../../hooks'

const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
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
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
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

export const Checkbox = React.forwardRef(
  ({ className, defaultOn, onChange, label, hideLabel, ...props }, ref) => {
    const [on, setOn] = React.useState(defaultOn || false)
    const previousOn = usePrevious(on)

    React.useEffect(() => {
      if (typeof previousOn !== 'undefined' && previousOn !== on) {
        return onChange(on)
      }
    }, [onChange, on, previousOn])

    return (
      <Label htmlFor={props.id} className={className}>
        <NativeCheckbox
          type="checkbox"
          ref={ref}
          checked={on}
          {...props}
          onChange={() => setOn(!on)}
        />
        <CustomCheckbox checked={on}>
          {on && <Checkmark size={20} />}
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
