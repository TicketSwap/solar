import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Label, LabelText, Input, Help } from '../Input'
import { ArrowDown } from '@ticketswap/comets'
import { VisuallyHidden } from '../VisuallyHidden'
import { Select } from '../Select'
import { useDeviceInfo } from '../../hooks'

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

const selectWidth = `${112 / 16}rem`

const SelectWrapper = styled.div`
  padding-right: ${space[8]};
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${selectWidth};

  .select {
    position: initial;
  }
`

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
  validateAmount,
  validateCurrency,
  ...props
}) {
  const isCurrencyControlled = typeof props.currency !== 'undefined'
  const isAmountControlled = typeof props.amount !== 'undefined'
  const intialSelectedIndex =
    isCurrencyControlled || props.initialSelectedCurrency
      ? currencies.indexOf(props.currency || props.initialSelectedCurrency)
      : 0
  const [currency, setCurrency] = React.useState(
    currencies[intialSelectedIndex]
  )
  const [amount, setAmount] = React.useState(
    props.initialAmount ? props.initialAmount / 100 : ''
  )
  const options = createSelectOptions(currencies)
  const inputRef = React.useRef()
  const parseAmount = value => Math.round(parseFloat(value) * 100) || 0
  const { isMobile } = useDeviceInfo()

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
                label="Currency"
                hideLabel
                value={
                  isCurrencyControlled ? props.currency.symbol : currency.symbol
                }
                rightAdornment={<ArrowDown size={16} />}
              />
            </FauxSelectWrapper>
          )}
          <Select
            items={options}
            id="currency"
            label="Currency"
            hideLabel
            floatingMenu
            validate={validateCurrency}
            selectedItem={
              isCurrencyControlled
                ? options.filter(
                    option => option.value === props.currency.code
                  )[0]
                : undefined
            }
            initialSelectedItem={options[intialSelectedIndex]}
            onChange={e => {
              const selectedCurrency = currencies.filter(
                c => c.code === e.value
              )[0]
              setCurrency(selectedCurrency)
              onChange({
                currency: selectedCurrency,
                amount: isAmountControlled ? props.amount : parseAmount(amount),
              })
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
            value={isAmountControlled ? props.amount / 100 : amount}
            validate={validateAmount}
            {...props}
            onChange={e => {
              setAmount(e.target.value)
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
  currency: PropTypes.shape({
    code: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  initialSelectedCurrency: PropTypes.shape({
    code: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validateAmount: PropTypes.bool,
  validateCurrency: PropTypes.bool,
}
