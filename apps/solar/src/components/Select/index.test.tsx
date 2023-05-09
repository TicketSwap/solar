import React from 'react'
import { screen, render, fireEvent } from '../../../test/test.utils'
import { Select } from '.'
import * as useDeviceInfo from '../../hooks/useDeviceInfo'

jest.mock('../../hooks/useDeviceInfo')

const languages = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

describe('Select', () => {
  describe('when the component is rendered on mobile', () => {
    beforeAll(() => {
      jest.spyOn(useDeviceInfo, 'useDeviceInfo').mockImplementation(() => ({
        isMobile: () => true,
        isIOS: () => true,
        isDesktop: () => false,
        isAndroid: () => false,
      }))
    })

    afterAll(() => {
      jest.clearAllMocks()
    })

    it('renders a native select box', async () => {
      render(
        <Select
          id="language"
          label="Language"
          items={languages}
          onChange={() => {}}
        />
      )

      expect(
        screen.queryByRole('textbox', { name: /language arrowdown/i })
      ).not.toBeInTheDocument()

      expect(
        screen.getByRole('combobox', { name: /language/i })
      ).toBeInTheDocument()
    })
  })

  describe('when the component is rendered on any other device', () => {
    beforeAll(() => {
      jest.spyOn(useDeviceInfo, 'useDeviceInfo').mockImplementation(() => ({
        isDesktop: () => true,
        isMobile: () => false,
        isAndroid: () => false,
        isIOS: () => false,
      }))
    })

    afterAll(() => {
      jest.clearAllMocks()
    })

    it('renders a custom select box', async () => {
      render(
        <Select
          id="language"
          label="Language"
          items={languages}
          onChange={() => {}}
        />
      )

      expect(
        screen.queryByRole('combobox', { name: /language/i })
      ).not.toBeInTheDocument()

      expect(
        screen.getByRole('textbox', { name: /language arrowdown/i })
      ).toBeInTheDocument()
    })

    it('renders without crashing and has menu closed initially', () => {
      const { container, queryByText } = render(
        <Select id="language" label="Language" items={languages} />
      )
      expect(container.firstChild).toBeInTheDocument()
      expect(queryByText(/italian/i)).toBeNull()
    })

    it('value equals first item', () => {
      const { getByLabelText } = render(
        <Select id="language" label="Language" items={languages} />
      )

      const input = getByLabelText(/language/i) as HTMLInputElement
      expect(input.value).toEqual(languages[0].name)
    })

    describe('when the select box is clicked', () => {
      it('shows the dropdown', () => {
        render(<Select id="language" label="Language" items={languages} />)

        fireEvent.focus(screen.getByLabelText(/language/i))

        expect(screen.getByText(/italian/i)).toBeInTheDocument()
      })

      describe('and a key is a pressed', () => {
        it('highlights the correct option', () => {
          render(<Select id="language" label="Language" items={languages} />)

          fireEvent.focus(screen.getByLabelText(/language/i))

          fireEvent.keyDown(screen.getByRole('textbox'), {
            key: 'D',
            code: 'D',
            charCode: 68,
          })

          fireEvent.keyDown(screen.getByRole('textbox'), {
            key: 'U',
            code: 'U',
            charCode: 85,
          })

          expect(screen.getByText(/Dutch/i)).toHaveAttribute(
            'data-highlighted',
            '2'
          )
        })
      })
    })

    it('handles a passed initial value correctly', async () => {
      const { getByLabelText } = render(
        <Select
          id="language"
          label="Language"
          items={languages}
          initialSelectedItem={languages[1]}
        />
      )
      const input = getByLabelText(/language/i) as HTMLInputElement

      expect(input.value).toEqual(languages[1].name)
    })

    it('calls onChange handler correctly and closes menu on item click', () => {
      const handler = jest.fn()
      const { getByText, getByLabelText, queryByText } = render(
        <Select
          id="language"
          label="Language"
          items={languages}
          onChange={selection => handler(selection)}
        />
      )
      fireEvent.focus(getByLabelText(/language/i))
      fireEvent.mouseDown(getByText(/dutch/i))
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(languages[2])
      expect(queryByText(/italian/i)).toBeNull()
    })
  })
})
