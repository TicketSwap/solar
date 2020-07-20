import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Checkmark } from '@ticketswap/comets'
import { space, color, radius, fontWeight } from '../../theme'
import { VisuallyHidden } from '../VisuallyHidden'
import { SmallText } from '../Text'

const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
`

const Help = styled(SmallText)`
  color: ${color.spaceLight};
  display: block;
`

const LabelText = styled.span`
  flex-shrink: 1;
  display: inline-block;
  color: ${color.spaceMedium};

  strong {
    color: ${color.space};
    font-weight: ${fontWeight.semiBold};
  }
`

const LabelTextContainer = styled.span`
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
  flex-shrink: 0;
  position: relative;
  color: ${color.nova};
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
  (
    { className, defaultOn, onChange, label, hideLabel, help, ...props },
    ref
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
          checked={getOn()}
          {...otherProps}
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
          <LabelTextContainer>
            <LabelText>{label}</LabelText>
            {help && <Help>{help}</Help>}
          </LabelTextContainer>
        )}
      </Label>
    )
  }
)

Checkbox.defaultProps = {
  onChange: () => {},
  defaultOn: false,
  hideLabel: false,
  checked: false,
}

Checkbox.propTypes = {
  defaultOn: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  hideLabel: PropTypes.bool,
  help: PropTypes.string,
  checked: PropTypes.bool,
  on: PropTypes.bool,
}
