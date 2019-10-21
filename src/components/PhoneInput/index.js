import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { VisuallyHidden } from '../VisuallyHidden'
import { Help, Input, Label, LabelText } from '../Input'
import { ArrowDown } from '@ticketswap/comets'
import { useId } from '@reach/auto-id'
import { Select } from '../Select'
import { Flag } from '../Flag'
import { useDeviceInfo } from '../../hooks'

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`

const selectWidth = `${152 / 16}rem`

const FauxSelectWrapper = styled.span`
  display: block;
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: ${selectWidth};
  padding-right: ${space[8]};
`

const SelectWrapper = styled.div`
  padding-right: ${space[8]};
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${selectWidth};

  .select {
    position: initial;
  }
`

const InputWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
`

function createSelectOptions(countries) {
  return countries.map(({ code, name, value }) => ({
    value,
    name,
    displayName: `+${code}`,
    leftAdornment: <Flag countryCode={value} />,
  }))
}

export const PhoneInput = React.forwardRef(
  (
    {
      countries,
      help,
      hideLabel,
      id,
      initialNumber,
      initialSelectedCountry,
      label,
      onChange,
      validateCountry,
      validateNumber,
      ...props
    },
    ref
  ) => {
    const inputRef = ref ? ref : React.useRef()
    const options = createSelectOptions(countries)
    const intialSelectedIndex = initialSelectedCountry
      ? countries.indexOf(initialSelectedCountry)
      : 0
    const [country, setCountry] = React.useState(
      countries[intialSelectedIndex || 0]
    )
    const [number, setNumber] = React.useState(
      initialNumber ? initialNumber : ''
    )
    const { isMobile } = useDeviceInfo()
    const inputId = `phone-input-${useId()}`

    return (
      <Label htmlFor={id}>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelText>{label}</LabelText>
          </VisuallyHidden>
        ) : (
          <LabelText>{label}</LabelText>
        )}
        <InputGroup id={id}>
          <SelectWrapper>
            {isMobile() && (
              <FauxSelectWrapper>
                <Input
                  id={`${inputId}-faux-country`}
                  label="Country"
                  hideLabel
                  value={`+${country.code}`}
                  leftAdornment={
                    <Flag countryCode={country && country.value} />
                  }
                  rightAdornment={<ArrowDown size={16} />}
                  onChange={() => {}}
                />
              </FauxSelectWrapper>
            )}
            <Select
              id={`${inputId}-country`}
              label="Country"
              hideLabel
              items={options}
              floatingMenu
              validate={validateCountry}
              initialSelectedItem={options[intialSelectedIndex]}
              leftAdornment={<Flag countryCode={country && country.value} />}
              onChange={e => {
                const selectedCountry = countries.filter(
                  c => c.value === e.value
                )[0]
                setCountry(selectedCountry)
                onChange({ country: selectedCountry, number })
                if (typeof requestAnimationFrame === 'undefined') return false
                requestAnimationFrame(() => inputRef.current.focus())
              }}
            />
          </SelectWrapper>
          <InputWrapper>
            <Input
              id={`${inputId}-number`}
              label="Number"
              ref={inputRef}
              hideLabel
              type="number"
              value={number}
              validate={validateNumber}
              {...props}
              onChange={e => {
                setNumber(e.target.value)
                onChange({ country, number: e.target.value })
              }}
            />
          </InputWrapper>
        </InputGroup>
        {help && <Help>{help}</Help>}
      </Label>
    )
  }
)

PhoneInput.defaultProps = {
  onChange: () => {},
}

PhoneInput.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  initialNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialSelectedCountry: PropTypes.shape({
    code: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validateCountry: PropTypes.bool,
  validateNumber: PropTypes.bool,
}
