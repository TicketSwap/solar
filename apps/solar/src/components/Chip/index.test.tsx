import React from 'react'
import { fireEvent, render, screen } from '../../../test/test.utils'
import { Chip, ChipWithToggle, ChipWithSelect } from './'
import { CalendarAlt, ChevronDown } from '../../icons'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

describe('Chip', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(<Chip>Has tickets</Chip>)
    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/Has tickets/i)).toBeInTheDocument()
  })

  describe('when the Chip is inactive', () => {
    it('will show only the child text in inactive color', () => {
      const { container, getByText } = render(<Chip>Has tickets</Chip>)

      expect(getByText(/Has tickets/i)).toBeInTheDocument()
      expect(container.firstChild).toHaveStyleRule(
        'color',
        'var(--_accentColor)'
      )
    })

    describe('when the Chip has a startAdornment and text', () => {
      it('will show both', () => {
        render(<Chip startAdornment={<CalendarAlt size={24} />}>Nearby</Chip>)

        expect(screen.getByText(/Nearby/i)).toBeInTheDocument()
        expect(
          screen.getByRole('presentation', { name: 'CalendarAlt' })
        ).toBeInTheDocument()
      })
    })

    describe('when the Chip has an endAdornment and text', () => {
      it('will show both', () => {
        render(<Chip endAdornment={<CalendarAlt size={24} />}>Nearby</Chip>)

        expect(screen.getByText(/Nearby/i)).toBeInTheDocument()
        expect(
          screen.getByRole('presentation', { name: 'CalendarAlt' })
        ).toBeInTheDocument()
      })
    })

    describe('when the Chip has adornments and text', () => {
      it('will show the 3 of them', () => {
        render(
          <Chip
            startAdornment={<CalendarAlt size={24} />}
            endAdornment={<ChevronDown size={16} />}
          >
            Nearby
          </Chip>
        )

        expect(screen.getByText(/Nearby/i)).toBeInTheDocument()
        expect(
          screen.getByRole('presentation', { name: 'CalendarAlt' })
        ).toBeInTheDocument()
        expect(
          screen.getByRole('presentation', { name: 'ChevronDown' })
        ).toBeInTheDocument()
      })
    })
  })

  describe('when the Chip is active', () => {
    it('will show only the child text in active color', () => {
      const { container, getByText } = render(<Chip active>Has tickets</Chip>)

      expect(getByText(/Has tickets/i)).toBeInTheDocument()
      expect(container.firstChild).toHaveStyleRule(
        'color',
        'var(--_accentColor)'
      )
    })
  })

  describe('when the chip is a uncontrolled select', () => {
    it('will have a default value and will be inactive', async () => {
      const { container } = render(
        <ChipWithSelect
          options={[
            { label: 'Category', value: '' },
            { label: 'Festivals', value: 'festivals' },
            { label: 'Concerts', value: 'concerts' },
          ]}
        />
      )

      const select = screen.getByRole('combobox')

      const defaultOption = screen.getByRole('option', {
        name: /Category/i,
        hidden: true,
      })

      expect(select).toBeInTheDocument()
      expect(defaultOption).toBeInTheDocument()
      expect(container.firstChild).toHaveStyleRule(
        'color',
        'var(--_accentColor)'
      )
    })

    it('will update the internal state when an option is clicked', () => {
      const { container } = render(
        <ChipWithSelect
          options={[
            { label: 'Category', value: '' },
            { label: 'Festivals', value: 'festivals' },
            { label: 'Concerts', value: 'concerts' },
          ]}
        />
      )

      const select = screen.getByRole('combobox')

      fireEvent.change(select, { target: { value: 'festivals' } })

      expect(select).toHaveValue('festivals')
      expect(container.firstChild).toHaveStyleRule(
        'color',
        'var(--_accentColor)'
      )
    })
  })

  describe('when the Chip is a controlled select', () => {
    it('will have a value selected', async () => {
      const { container } = render(
        <ChipWithSelect
          value="tomorrow"
          options={[
            { label: 'Today', value: 'today' },
            { label: 'Tomorrow', value: 'tomorrow' },
            { label: 'This weekend', value: 'this-weekend' },
          ]}
        />
      )

      const select = screen.getByRole('combobox')

      expect(select).toHaveValue('tomorrow')
      expect(container.firstChild).toHaveStyleRule(
        'color',
        'var(--_accentColor)'
      )
    })

    it('will trigger the onChange with the new value', () => {
      const onChange = jest.fn()

      render(
        <ChipWithSelect
          value="tomorrow"
          onChange={event => onChange(event.target.value)}
          options={[
            { label: 'Today', value: 'today' },
            { label: 'Tomorrow', value: 'tomorrow' },
            { label: 'This weekend', value: 'this-weekend' },
          ]}
        />
      )

      const select = screen.getByRole('combobox')

      fireEvent.change(select, { target: { value: 'this-weekend' } })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('this-weekend')
    })
  })

  describe('when the chip is a toogle', () => {
    it('can be toggled', () => {
      const { getByRole } = render(<ChipWithToggle>Has tickets</ChipWithToggle>)

      expect(document.querySelector('input')).not.toBeChecked()
      fireEvent.click(getByRole(/checkbox/i))
      expect(document.querySelector('input')).toBeChecked()
    })

    it('can be untoggled', () => {
      const { getByRole } = render(
        <ChipWithToggle defaultChecked>Has tickets</ChipWithToggle>
      )

      expect(document.querySelector('input')).toBeChecked()
      fireEvent.click(getByRole(/checkbox/i))
      expect(document.querySelector('input')).not.toBeChecked()
    })
  })
})
