import React from 'react'
import { MoneyInput } from './'
import { Button } from '../Button'

const currencies = [
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
  {
    code: 'DKK',
    symbol: 'DKK',
    name: 'Danish Krone',
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
  },
  {
    code: 'HUF',
    symbol: 'HUF',
    name: 'Hungarian Forint',
  },
  {
    code: 'PLN',
    symbol: 'PLN',
    name: 'Polish Zloty',
  },
  {
    code: 'SEK',
    symbol: 'SEK',
    name: 'Swedish Krona',
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
  },
  {
    code: 'NZD',
    symbol: 'NZ$',
    name: 'New Zealand Dollar',
  },
  {
    code: 'CHF',
    symbol: 'CHF',
    name: 'Swiss Franc',
  },
  {
    code: 'NOK',
    symbol: 'NOK',
    name: 'Norwegian Krone',
  },
]

function ControlledMoneyInput() {
  const [currency, setCurrency] = React.useState(currencies[2])
  const [amount, setAmount] = React.useState(25)
  const parseAmount = value => Math.round(parseFloat(value) * 100) || 0

  React.useEffect(() => {
    console.log({
      currency,
      amount: parseAmount(amount),
    })
  }, [currency, amount])

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridGap: '0.5rem',
          gridAutoFlow: 'column',
          marginBottom: '0.25rem',
        }}
      >
        <Button size="small" onClick={() => setCurrency(currencies[0])}>
          Set Euro
        </Button>
        <Button size="small" onClick={() => setCurrency(currencies[2])}>
          Set Pounds
        </Button>
        <Button size="small" variant="success" onClick={() => setAmount(20)}>
          Set 20
        </Button>
        <Button
          size="small"
          variant="success"
          onClick={() => setAmount('40.50')}
        >
          Set 40,50
        </Button>
      </div>
      <MoneyInput
        id="maximum-price"
        label="Maximum price"
        placeholder="Enter an amount"
        currencies={currencies}
        onChange={e => {
          setCurrency(e.currency)
          setAmount(e.amount)
        }}
        currency={currency}
        amount={amount}
        help="Leave blank for no maximum price"
      />
    </>
  )
}

export default {
  title: 'MoneyInput',
}

export const Basic = () => (
  <MoneyInput
    id="maximum-price"
    label="Maximum price"
    currencies={currencies}
    onChange={e => console.log(e)}
  />
)

export const WithInitialValues = () => (
  <MoneyInput
    id="maximum-price"
    label="Maximum price"
    placeholder="Enter an amount"
    currencies={currencies}
    onChange={e => console.log(e)}
    initialSelectedCurrency={currencies[2]}
    initialAmount={240050}
    help="Leave blank for no maximum price"
  />
)

WithInitialValues.story = {
  name: 'With initial values',
}

export const WithDisabled = () => (
  <MoneyInput
    id="maximum-price"
    label="Maximum price"
    placeholder="Enter an amount"
    currencies={currencies}
    onChange={e => console.log(e)}
    initialSelectedCurrency={currencies[2]}
    initialAmount={240050}
    help="Leave blank for no maximum price"
    disabled={true}
  />
)

WithDisabled.story = {
  name: 'Disabled',
}

export const Controlled = () => <ControlledMoneyInput />

export const WithError = () => (
  <MoneyInput
    id="maximum-price"
    label="Maximum price"
    placeholder="Enter an amount"
    currencies={currencies}
    onChange={e => console.log(e)}
    initialSelectedCurrency={currencies[2]}
    initialAmount={2500}
    help="Leave blank for no maximum price"
    validateAmount={false}
    validateCurrency={false}
  />
)

WithError.story = {
  name: 'With error',
}
