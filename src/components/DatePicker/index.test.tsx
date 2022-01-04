import React, { useState } from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker, TimeFrame } from '.'

jest.mock('../../hooks/useOnClickOutside')

describe('DatePicker', () => {
  describe('when it has a placeholder set', () => {
    it('renders the placeholder', async () => {
      render(
        <DatePicker
          date={null}
          placeholder="From"
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      expect(screen.getByText(/from/i)).toBeInTheDocument()
    })
  })

  describe('when it has a date set', () => {
    it('renders the date', async () => {
      render(
        <DatePicker
          date={new Date(2020, 1, 1)}
          placeholder="From"
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      expect(screen.getByText(/Feb 1, 2020/i)).toBeInTheDocument()
    })
  })

  describe('when open', () => {
    it('renders the calendar', async () => {
      render(
        <DatePicker
          date={new Date(2020, 1, 1)}
          placeholder="From"
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          locale="en-EN"
          onChange={jest.fn()}
        />
      )

      userEvent.click(screen.getByText(/Feb 1, 2020/i))

      const calendarTitle = await screen.findByText(/pick a date/i)

      expect(calendarTitle).toBeInTheDocument()
    })

    describe('and a date is selected', () => {
      beforeEach(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(Date.parse('2020-11-18T00:00:00Z'))
      })

      afterEach(() => {
        jest.useRealTimers()
      })

      it('calls the onChange with the selected date', async () => {
        const onChange = jest.fn()

        render(
          <DatePicker
            date={null}
            placeholder="From"
            title="Pick a date"
            timeFrame={TimeFrame.future}
            monthLabel="Month"
            yearLabel="Year"
            info="Some important info"
            locale="en-EN"
            onChange={onChange}
          />
        )

        userEvent.click(screen.getByText(/From/i))

        await screen.findByText(/pick a date/i)

        userEvent.click(screen.getByText(/25/i))

        expect(onChange).toHaveBeenCalledWith(new Date(2020, 10, 25))
      })

      it('renders the calendar correctly', async () => {
        const TestScenario = () => {
          const [startDate, setStartDate] = useState(null)

          return (
            <>
              <DatePicker
                date={startDate}
                placeholder="From"
                title="Pick a date"
                timeFrame={TimeFrame.future}
                monthLabel="Month"
                yearLabel="Year"
                info="Some important info"
                locale="en-EN"
                onChange={date => setStartDate(date)}
              />
            </>
          )
        }

        render(<TestScenario />)

        userEvent.click(screen.getByText(/From/i))

        await screen.findByText(/pick a date/i)

        userEvent.click(screen.getByText(/25/i))

        userEvent.click(screen.getByText(/nov 25, 2020/i))

        expect(
          screen.getByRole('button', {
            name: '25',
          })
        ).toHaveAttribute('aria-selected')
      })
    })
  })

  describe('when in a different locale', () => {
    it('renders the date correctly', async () => {
      render(
        <DatePicker
          date={new Date(2020, 1, 1)}
          placeholder="From"
          title="Pick a date"
          timeFrame={TimeFrame.future}
          monthLabel="Month"
          yearLabel="Year"
          info="Some important info"
          locale="nl-NL"
          onChange={jest.fn()}
        />
      )

      expect(screen.getByText(/1 feb. 2020/i)).toBeInTheDocument()
    })
  })

  describe('when the date changes indirectly', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(Date.parse('2020-11-18T00:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('renders the calendar correctly', async () => {
      const TestScenario = () => {
        const [startDate, setStartDate] = useState(null)
        const [endDate, setEndDate] = useState(null)

        const handleStartDateChange = (date: Date) => {
          setStartDate(date)

          if (!endDate) {
            setEndDate(date)
          }
        }

        return (
          <>
            <DatePicker
              date={startDate}
              placeholder="From"
              title="Pick a date"
              timeFrame={TimeFrame.future}
              monthLabel="Month"
              yearLabel="Year"
              info="Some important info"
              locale="en-EN"
              onChange={date => handleStartDateChange(date)}
            />
            <DatePicker
              date={endDate}
              placeholder="To"
              title="Pick a date"
              timeFrame={TimeFrame.future}
              monthLabel="Month"
              yearLabel="Year"
              info="Some important info"
              locale="en-EN"
              onChange={date => setEndDate(date)}
            />
          </>
        )
      }

      render(<TestScenario />)

      userEvent.click(screen.getByText(/From/i))

      await screen.findByText(/pick a date/i)

      userEvent.click(screen.getByText(/year/i))

      userEvent.click(screen.getByText(/2022/i))

      userEvent.click(screen.getByText(/month/i))

      userEvent.click(screen.getByText(/january/i))

      userEvent.click(screen.getByText(/25/i))

      expect(screen.getAllByText(/jan 25, 2022/i)).toHaveLength(2)

      userEvent.click(screen.getAllByText(/jan 25, 2022/i)[1])

      expect(
        screen.getByRole('button', {
          name: '25',
        })
      ).toHaveAttribute('aria-selected', 'true')
    })
  })
})
