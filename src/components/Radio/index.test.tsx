import React, { createRef, useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio, RadioGroup, RadioWithLabel } from './'

const RadioExample = () => {
  const [value, setValue] = useState('')

  return (
    <Radio
      value={value}
      id="test"
      name="test"
      checked
      onChange={() => setValue('test')}
    />
  )
}

const RadioGroupExample = () => {
  const [value, setValue] = useState(null)

  return (
    <RadioGroup
      options={[
        { id: 'Rob', value: 'Rob', label: 'Rob' },
        { id: 'Bob', value: 'Bob', label: 'Bob' },
      ]}
      onChange={e => setValue(e.target.value)}
      value={value}
      legend="This is a RadioGroup"
      name="who-is-best"
    />
  )
}

describe('Radio', () => {
  it('renders without crashing', () => {
    render(
      <Radio onChange={() => null} value="on" checked id="test" name="test" />
    )

    expect(
      screen.getByRole('presentation', {
        name: /checkmark/i,
      })
    ).toBeInTheDocument()
  })

  describe('when it is clicked', () => {
    describe('and it has not been checked before', () => {
      it('fires an on change event ', () => {
        const handleChange = jest.fn()
        const valueMock = 'test'
        const ref = createRef<HTMLInputElement>()

        render(
          <Radio
            ref={ref}
            onChange={handleChange}
            value={valueMock}
            checked={false}
            id="test"
            name="test"
          />
        )

        userEvent.click(screen.getByRole('radio'))

        expect(handleChange).toBeCalledTimes(1)
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              value: valueMock,
            }),
          })
        )
      })

      it('checks the clicked option', async () => {
        render(<RadioExample />)

        userEvent.click(screen.getByRole('radio'))

        expect(screen.getByRole('radio')).toBeChecked()
      })
    })

    describe('and it is already checked', () => {
      it('does not fire an on change event', () => {
        const handleChange = jest.fn(event => event.target.value)
        const ref = createRef<HTMLInputElement>()

        render(
          <Radio
            ref={ref}
            onChange={handleChange}
            value="test"
            checked={true}
            id="test"
            name="test"
          />
        )

        userEvent.click(screen.getByRole('radio'))

        expect(handleChange).toBeCalledTimes(0)
      })
    })

    describe('and it is disabled', () => {
      it('does not fire an on change event', () => {
        const handleChange = jest.fn(event => event.target.value)
        const ref = createRef<HTMLInputElement>()

        render(
          <Radio
            ref={ref}
            onChange={handleChange}
            value="test"
            checked={false}
            id="test"
            name="test"
            disabled
          />
        )

        userEvent.click(screen.getByRole('radio'))

        expect(handleChange).toBeCalledTimes(0)
      })
    })
  })
})

describe('RadioWithLabel', () => {
  it('renders without crashing', () => {
    render(
      <RadioWithLabel
        onChange={() => null}
        value="on"
        checked
        id="test"
        name="test"
        label="Radio 1"
      />
    )

    expect(screen.getByText('Radio 1')).toBeInTheDocument()
    expect(
      screen.getByRole('presentation', {
        name: /checkmark/i,
      })
    ).toBeInTheDocument()
  })

  describe('on click', () => {
    it('fires an on change event when not checked before', () => {
      const handleChange = jest.fn()
      const valueMock = 'test'
      const ref = createRef<HTMLInputElement>()

      render(
        <RadioWithLabel
          ref={ref}
          onChange={handleChange}
          value={valueMock}
          checked={false}
          id="test"
          name="test"
          label="test"
        />
      )

      userEvent.click(screen.getByRole('radio'))

      expect(handleChange).toBeCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: valueMock,
          }),
        })
      )
    })

    it('does not fire an on change event when already checked', () => {
      const handleChange = jest.fn(event => event.target.value)
      const ref = createRef<HTMLInputElement>()

      render(
        <RadioWithLabel
          ref={ref}
          onChange={handleChange}
          value="test"
          checked={true}
          id="test"
          name="test"
          label="test"
        />
      )

      userEvent.click(screen.getByRole('radio'))

      expect(handleChange).toBeCalledTimes(0)
    })

    it('does not fire an on change event when disabled', () => {
      const handleChange = jest.fn(event => event.target.value)
      const ref = createRef<HTMLInputElement>()

      render(
        <RadioWithLabel
          ref={ref}
          onChange={handleChange}
          value="test"
          checked={false}
          id="test"
          name="test"
          disabled
          label="test"
        />
      )

      userEvent.click(screen.getByRole('radio'))

      expect(handleChange).not.toHaveBeenCalled()
    })
  })
})

describe('RadioGroup', () => {
  it('renders without crashing', async () => {
    render(
      <RadioGroup
        options={[
          { id: 'Rob', value: 'Rob', label: 'Rob' },
          { id: 'Bob', value: 'Bob', label: 'Bob', disabled: true },
        ]}
        onChange={() => null}
        value="on"
        legend="This is a RadioGroup"
        name="best"
      />
    )

    const firstOption = await screen.findByLabelText('Rob')
    const secondOption = await screen.findByLabelText('Bob')

    const options = await screen.findAllByRole('radio')

    expect(firstOption).toBeInTheDocument()
    expect(secondOption).toBeInTheDocument()
    expect(options).toHaveLength(2)
  })

  describe('with options', () => {
    it('has a list of radio buttons', () => {
      render(
        <RadioGroup
          options={[
            { id: 'Rob', value: 'Rob', label: 'Rob' },
            { id: 'Bob', value: 'Bob', label: 'Bob' },
          ]}
          onChange={() => null}
          value="on"
          legend="This is a RadioGroup"
          name="best"
        />
      )

      expect(
        screen.getByRole('radio', { name: /checkmark rob/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('radio', { name: /checkmark bob/i })
      ).toBeInTheDocument()
    })

    describe('and one of them is clicked', () => {
      it('checks the selected option', () => {
        render(<RadioGroupExample />)

        userEvent.click(screen.getByRole('radio', { name: /checkmark rob/i }))

        expect(
          screen.getByRole('radio', { name: /checkmark rob/i })
        ).toBeChecked()
        expect(
          screen.getByRole('radio', { name: /checkmark bob/i })
        ).not.toBeChecked()
      })
    })

    describe('and the other option is clicked', () => {
      it('checks the other option', () => {
        render(<RadioGroupExample />)

        userEvent.click(screen.getByRole('radio', { name: /checkmark rob/i }))

        userEvent.click(screen.getByRole('radio', { name: /checkmark bob/i }))

        expect(
          screen.getByRole('radio', { name: /checkmark bob/i })
        ).toBeChecked()
        expect(
          screen.getByRole('radio', { name: /checkmark rob/i })
        ).not.toBeChecked()
      })
    })
  })
})
