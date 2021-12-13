import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalendarDialog from './CalendarDialog'
import { TimeFrame } from '../../utils/dates'

jest.mock('../../hooks/useOnClickOutside')

const dialogIsOpen = async () => await screen.findByText('Pick a date')
const dropdownIsOpen = async () => await screen.findByRole('list')

describe('CalendarDialog', () => {
  describe('when closed', () => {
    it('invokes the close callback', async () => {
      const close = jest.fn()
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={close}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      userEvent.click(
        screen.getByRole('button', {
          name: /closealt/i,
        })
      )

      expect(close).toHaveBeenCalled()
    })

    it('does not render the dialog', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={false}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      expect(screen.queryByText('Pick a date')).not.toBeInTheDocument()
    })
  })

  describe('when open', () => {
    it('renders the dialog', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      const dialog = await dialogIsOpen()

      expect(dialog).toBeInTheDocument()
    })

    it('displays the correct number of days', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      expect(screen.getAllByRole('button')).toHaveLength(30)
    })
  })

  describe('when a date is provided', () => {
    it('displays the date as selected', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      expect(
        screen.getByRole('button', {
          name: '1',
        })
      ).toHaveAttribute('aria-selected')
    })
  })

  describe('when a date is not initially provided', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(Date.parse('2020-02-18T00:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('displays the current month and year', async () => {
      render(
        <CalendarDialog
          date={null}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      expect(
        screen.getByRole('textbox', { name: /month arrowdown/i })
      ).toHaveValue('February')
      expect(
        screen.getByRole('textbox', {
          name: /year arrowdown/i,
        })
      ).toHaveValue('2020')
    })
  })

  describe('when a new month is selected', () => {
    it('displays the new month', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      userEvent.click(screen.getByRole('textbox', { name: /month arrowdown/i }))

      await dropdownIsOpen()

      userEvent.click(
        screen.getByRole('option', {
          name: /march/i,
        })
      )

      await screen.findByDisplayValue(/march/i)

      expect(
        screen.getByRole('textbox', { name: /month arrowdown/i })
      ).toHaveValue('March')
    })
  })

  describe('when a new year is selected', () => {
    it('displays the new year', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      userEvent.click(screen.getByRole('textbox', { name: /year arrowdown/i }))

      await dropdownIsOpen()

      userEvent.click(
        screen.getByRole('option', {
          name: /2023/i,
        })
      )

      await screen.findByDisplayValue(/2023/i)

      expect(
        screen.getByRole('textbox', { name: /year arrowdown/i })
      ).toHaveValue('2023')
    })
  })

  describe('when a day is selected', () => {
    it('saves the selected day', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      userEvent.click(screen.getByRole('button', { name: '4' }))

      expect(
        screen.getByRole('button', {
          name: '4',
        })
      ).toHaveAttribute('aria-selected')
    })
  })

  describe('when the timeFrame is in the future', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(Date.parse('2020-11-18T00:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('disables past dates', async () => {
      render(
        <CalendarDialog
          date={null}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      expect(screen.getByRole('button', { name: '1' })).toBeDisabled()
      expect(screen.getByRole('button', { name: '17' })).toBeDisabled()
    })
  })

  describe('when the timeFrame is in the past', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(Date.parse('2020-11-18T00:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('disables future dates', async () => {
      render(
        <CalendarDialog
          date={null}
          title="Pick a date"
          timeFrame={TimeFrame.past}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      expect(screen.getByRole('button', { name: '19' })).toBeDisabled()
      expect(screen.getByRole('button', { name: '30' })).toBeDisabled()
    })
  })

  describe('when the timeFrame is all', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(Date.parse('2020-11-18T00:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('enables all dates', async () => {
      render(
        <CalendarDialog
          date={null}
          title="Pick a date"
          timeFrame={TimeFrame.all}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      expect(screen.getByRole('button', { name: '1' })).toBeEnabled()
      expect(screen.getByRole('button', { name: '29' })).toBeEnabled()
    })
  })

  describe('when provided with a different locale', () => {
    it('displays the dialog in the given language', async () => {
      const date = new Date(2020, 1, 1)

      render(
        <CalendarDialog
          date={date}
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          isOpen={true}
          close={jest.fn()}
          locale="nl-NL"
          onChange={jest.fn()}
        />
      )

      await dialogIsOpen()

      expect(screen.getByText('ma')).toBeInTheDocument()
      expect(screen.getByText('zo')).toBeInTheDocument()
    })
  })
})
