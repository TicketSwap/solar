import React from 'react'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { VisuallyHidden } from '../VisuallyHidden'
import { Help, Input, Label, LabelText } from '../Input'
import { ArrowDown } from '@ticketswap/comets'
import { useId } from '@reach/auto-id'
import { Select } from '../Select'
import { Flag } from '../Flag'
import { useDeviceInfo } from '../../hooks'

export interface PhoneCountryProp {
  code: number
  name: string
  value: string
}

export interface PhoneInputOnChangeType {
  country: PhoneCountryProp
  number: string
}

export interface PhoneInputProps {
  countries: PhoneCountryProp[]
  id: string
  initialNumber?: string
  initialSelectedCountry?: PhoneCountryProp
  label: string
  onChange?: (value: PhoneInputOnChangeType) => void
  validateCountry?: boolean
  validateNumber?: boolean
  hideLabel?: boolean
  help?: string
  value?: string
}

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

function createSelectOptions(countries: PhoneCountryProp[]) {
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
      onChange = () => {},
      validateCountry,
      validateNumber,
      value,
      ...props
    }: PhoneInputProps,
    forwardedRef: React.Ref<HTMLInputElement>
  ) => {
    const ref = React.useRef<HTMLInputElement>(null)
    const inputRef = forwardedRef ? forwardedRef : ref
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

    const isControlled = typeof value !== 'undefined'
    const phoneNumber = isControlled ? value : number

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
                if (typeof requestAnimationFrame === 'undefined') return

                // https://stackoverflow.com/a/62238917/5503094
                if (typeof inputRef === 'function') return

                requestAnimationFrame(() => {
                  if (!inputRef.current) return

                  inputRef.current.focus()
                })
              }}
            />
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
          </SelectWrapper>
          <InputWrapper>
            <Input
              id={`${inputId}-number`}
              label="Number"
              ref={inputRef}
              hideLabel
              type="number"
              value={phoneNumber}
              validate={validateNumber}
              {...props}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNumber(event.target.value)
                onChange({ country, number: event.target.value })
              }}
            />
          </InputWrapper>
        </InputGroup>
        {help && <Help>{help}</Help>}
      </Label>
    )
  }
)
