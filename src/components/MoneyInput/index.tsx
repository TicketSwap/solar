import React from 'react'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Label, LabelText, Input, Help } from '../Input'
import { ArrowDown } from '../../icons'
import { VisuallyHidden } from '../VisuallyHidden'
import { Select } from '../Select'
import { useDeviceInfo } from '../../hooks'
import { useId } from '@reach/auto-id'

export interface MoneyInputCurrencyProp {
  code: string
  symbol: string
  name: string
}

export interface MoneyInputOnChangeType {
  currency: MoneyInputCurrencyProp
  amount: number | string
}

export interface MoneyInputProps {
  onChange?: (value: MoneyInputOnChangeType) => void
  id: string
  label: string
  currencies: MoneyInputCurrencyProp[]
  currency?: MoneyInputCurrencyProp
  initialSelectedCurrency?: MoneyInputCurrencyProp
  amount?: number | string
  initialAmount?: number
  validateAmount?: boolean
  validateCurrency?: boolean
  disabled?: boolean
  hideLabel?: boolean
  help?: string
}

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
  width: ${selectWidth};
  padding-right: ${space[8]};
`

function createSelectOptions(currencies: MoneyInputCurrencyProp[]) {
  return currencies.map(({ code, symbol, name }) => ({
    value: code,
    name,
    displayName: symbol,
  }))
}

export const parseAmount = (value: number | string) => {
  if (typeof value === 'number') {
    return Math.round(value * 100) || 0
  }

  return Math.round(parseFloat(value) * 100) || 0
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
  id,
  label,
  hideLabel,
  currencies,
  onChange = () => {},
  help,
  validateAmount,
  validateCurrency,
  disabled = false,
  ...props
}) => {
  const isAmountControlled = typeof props.amount !== 'undefined'
  const selectedCurrency = props.currency || props.initialSelectedCurrency
  const initialSelectedIndex = selectedCurrency
    ? currencies.indexOf(selectedCurrency)
    : 0
  const initialValue = props.initialAmount ? props.initialAmount / 100 : 0
  const [amount, setAmount] = React.useState(
    props.initialAmount
      ? Number.isInteger(initialValue)
        ? initialValue
        : initialValue.toFixed(2)
      : ''
  )
  const [currency, setCurrency] = React.useState(
    currencies[initialSelectedIndex]
  )
  const options = createSelectOptions(currencies)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const { isMobile } = useDeviceInfo()
  const inputId = `money-input-${useId()}`

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
            id={`${inputId}-currency`}
            label="Currency"
            hideLabel
            disabled={disabled}
            floatingMenu
            validate={validateCurrency}
            selectedItem={
              typeof props.currency === 'undefined'
                ? options.filter(option => {
                    if (typeof props.currency === 'undefined') return false
                    return option.value === props.currency.code
                  })[0]
                : undefined
            }
            initialSelectedItem={options[initialSelectedIndex]}
            onChange={e => {
              const selectedCurrency = currencies.filter(
                c => c.code === e.value
              )[0]
              setCurrency(selectedCurrency)
              onChange({
                currency: selectedCurrency,
                amount: props.amount ? props.amount : parseAmount(amount),
              })
              if (typeof requestAnimationFrame === 'undefined') return false

              return requestAnimationFrame(() => {
                if (!inputRef.current) return

                return inputRef.current.focus()
              })
            }}
          />
          {isMobile() && (
            <FauxSelectWrapper>
              <Input
                id={`${inputId}-faux-currency`}
                label="Currency"
                hideLabel
                disabled={disabled}
                value={props.currency ? props.currency.symbol : currency.symbol}
                rightAdornment={<ArrowDown size={16} />}
              />
            </FauxSelectWrapper>
          )}
        </SelectWrapper>
        <InputWrapper>
          <Input
            id={`${inputId}-amount`}
            label="Amount"
            ref={inputRef}
            hideLabel
            type="number"
            step="0.01"
            value={isAmountControlled ? props.amount : amount}
            disabled={disabled}
            validate={validateAmount}
            {...props}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(event.target.value)
              onChange({
                currency,
                amount: isAmountControlled
                  ? event.target.value
                  : parseAmount(event.target.value),
              })
            }}
          />
        </InputWrapper>
      </InputGroup>
      {help && <Help>{help}</Help>}
    </Label>
  )
}
