import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Label, LabelText, Input, Help } from '../Input'
import { VisuallyHidden } from '../VisuallyHidden'
import { Select } from '../Select'

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`

const InputWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
`

const SelectWrapper = styled.div`
  padding-right: ${space[8]};
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${112 / 16}rem;

  .select {
    position: initial;
  }
`

function createSelectOptions(currencies) {
  return currencies.map(({ code, symbol, name }) => ({
    value: code,
    name,
    displayName: symbol,
  }))
}

export function MoneyInput({
  id,
  label,
  hideLabel,
  currencies,
  onChange,
  help,
  ...props
}) {
  const intialSelectedIndex = props.initialSelectedCurrency
    ? currencies.indexOf(props.initialSelectedCurrency)
    : 0
  const [currency, setCurrency] = React.useState(
    currencies[intialSelectedIndex]
  )
  const [value, setValue] = React.useState(
    props.initialAmount ? props.initialAmount / 100 : ''
  )
  const options = createSelectOptions(currencies)
  const inputRef = React.useRef()
  const parseAmount = value => Math.round(parseFloat(value) * 100) || 0

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
            items={options}
            id="currency"
            label="Currency"
            hideLabel
            initialSelectedItem={options[intialSelectedIndex]}
            onChange={e => {
              const selectedCurrency = currencies.filter(
                c => c.code === e.value
              )[0]
              setCurrency(selectedCurrency)
              onChange({
                currency: selectedCurrency,
                amount: parseAmount(value),
              })
              // Not sure this is the way to go, but it
              // won’t work otherwise ಠ_ಠ
              if (typeof requestAnimationFrame === 'undefined') return false
              requestAnimationFrame(() => inputRef.current.focus())
            }}
          />
        </SelectWrapper>
        <InputWrapper>
          <Input
            id="value"
            label="Amount"
            ref={inputRef}
            hideLabel
            type="number"
            value={value}
            {...props}
            onChange={e => {
              setValue(e.target.value)
              onChange({
                currency,
                amount: parseAmount(e.target.value),
              })
            }}
          />
        </InputWrapper>
      </InputGroup>
      {help && <Help>{help}</Help>}
    </Label>
  )
}

MoneyInput.defaultProps = {
  onChange: () => {},
}

MoneyInput.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialSelectedCurrency: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  initialAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
