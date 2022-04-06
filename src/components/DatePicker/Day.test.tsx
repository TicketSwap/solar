import React from 'react'
import { screen, render } from '../../../test/test.utils'
import Day from './Day'

describe('Day', () => {
  describe('when the day is in the future', () => {
    it('renders the day as enabled', () => {
      const date = new Date(2050, 1, 1)

      render(<Day date={date} isSelected={false} onSelect={jest.fn()} />)

      expect(
        screen.getByRole('button', {
          name: /1/i,
        })
      ).toBeEnabled()
    })

    describe('and the day is selected', () => {
      it('saves the selected day', async () => {
        const date = new Date(2050, 1, 1)
        const onSelect = jest.fn()

        const { user } = render(
          <Day date={date} isSelected={false} onSelect={onSelect} />
        )

        await user.click(
          screen.getByRole('button', {
            name: /1/i,
          })
        )

        expect(onSelect).toHaveBeenCalledWith(date)
      })

      it('renders the day as selected', () => {
        const date = new Date(2021, 1, 1)

        render(<Day date={date} isSelected={true} onSelect={jest.fn()} />)

        expect(
          screen.getByRole('button', {
            name: /1/i,
          })
        ).toHaveAttribute('aria-selected')
      })
    })
  })

  describe('when the day is disabled', () => {
    it('renders the day as disabled', () => {
      const date = new Date(2000, 1, 1)

      render(
        <Day
          date={date}
          isSelected={false}
          isDisabled={true}
          onSelect={jest.fn()}
        />
      )

      expect(
        screen.getByRole('button', {
          name: /1/i,
        })
      ).toBeDisabled()
    })

    describe('and the day is selected', () => {
      it('does not save the selected day', async () => {
        const date = new Date(2000, 1, 1)
        const onSelect = jest.fn()

        const { user } = render(
          <Day
            date={date}
            isSelected={false}
            isDisabled={true}
            onSelect={onSelect}
          />
        )

        await user.click(
          screen.getByRole('button', {
            name: /1/i,
          })
        )

        expect(onSelect).not.toHaveBeenCalled()
      })
    })
  })

  describe('when the day is today', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(Date.parse('2020-11-18T00:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('renders the day as current', () => {
      render(
        <Day
          date={new Date(2020, 10, 18)}
          isSelected={false}
          onSelect={jest.fn()}
        />
      )

      expect(
        screen.getByRole('button', {
          name: /1/i,
        })
      ).toHaveAttribute('aria-current', 'date')
    })
  })
})
