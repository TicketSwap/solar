import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Checkmark } from '../../icons'
import { space, color, radius, fontWeight } from '../../theme'
import { VisuallyHidden } from '../VisuallyHidden'
import { SmallText } from '../Text'

const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  user-select: none;
`

const Help = styled(SmallText)`
  color: ${color.foregroundMuted};
  display: block;
`

const LabelText = styled.span`
  flex-shrink: 1;
  display: inline-block;
  color: ${color.foreground};

  strong {
    font-weight: ${fontWeight.semiBold};
  }
`

const LabelTextContainer = styled.span`
  margin-inline-start: ${space[8]};
`

const NativeCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  block-size: 1px;
  margin-block: -1px;
  margin-inline: -1px;
  overflow: hidden;
  padding-block: 0;
  padding-inline: 0;
  position: absolute;
  white-space: nowrap;
  inline-size: 1px;
`

interface CustomCheckboxProps {
  disabled?: boolean
  checked?: boolean
}

const CustomCheckbox = styled.div<CustomCheckboxProps>`
  flex-shrink: 0;
  position: relative;
  color: ${color.onAction};
  inline-size: ${space[24]};
  block-size: ${space[24]};
  background-color: ${props =>
    props.disabled
      ? color.inactiveBackground
      : props.checked
      ? color.action
      : color.inactiveBackground};
  border-radius: ${radius.sm};
  transition: background-color 150ms ease-out;
  cursor: ${props => (props.disabled ? 'unset' : 'pointer')};

  ${NativeCheckbox}:focus + &,
  ${NativeCheckbox}:active + & {
    outline: 0;
    box-shadow: ${props =>
      props.disabled ? 'unset' : `0 0 0 ${space[4]} ${color.actionBackground}`};
    background-color: ${props =>
      props.disabled
        ? color.inactiveBackground
        : props.checked
        ? color.action
        : color.inactiveBackground};
  }
`

const IconContainer = styled.span`
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
`

export interface CheckboxProps {
  id: string
  className?: string
  defaultOn?: boolean
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void
  label: string | ReactNode
  hideLabel?: boolean
  help?: string
  disabled?: boolean
  on?: boolean
}

const Checkbox: React.FC<CheckboxProps> = React.forwardRef(
  (
    {
      className,
      defaultOn = false,
      onChange = () => null,
      label,
      hideLabel = false,
      help,
      disabled = false,
      ...props
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [on, setOn] = React.useState(defaultOn)
    const isOnControlled = () => props.on !== undefined
    const getOn = () => (isOnControlled() ? props.on : on)
    const { on: _, ...otherProps } = props

    return (
      <Label htmlFor={props.id} className={className}>
        <NativeCheckbox
          type="checkbox"
          ref={ref}
          disabled={disabled}
          checked={getOn()}
          {...otherProps}
          onChange={e => {
            if (!isOnControlled()) {
              setOn(e.target.checked)
              onChange(e)
            }
          }}
        />
        <CustomCheckbox checked={getOn()} disabled={disabled}>
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
          <LabelTextContainer>
            <LabelText>{label}</LabelText>
            {help && <Help>{help}</Help>}
          </LabelTextContainer>
        )}
      </Label>
    )
  }
)

export { Checkbox }
