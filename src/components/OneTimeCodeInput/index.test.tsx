import React from 'react'
import { fireEvent, render, screen, waitFor } from '../../../test/test.utils'
import { matchers } from '@emotion/jest'
import { OneTimeCodeInput } from './'

expect.extend(matchers)

describe('OneTimeCodeInput', () => {
  describe('when the length is equal to 6', () => {
    it('renders a component with 6 inputs', () => {
      render(
        <OneTimeCodeInput
          id="OneTimeCodeInput"
          ariaLabel="OneTimeCode Input Field"
          label="Verificationcode"
          length={6}
        />
      )

      expect(screen.getAllByRole('textbox')).toHaveLength(6)
    })
  })

  describe('when the component has a label', () => {
    it('renders the input with label', () => {
      render(
        <OneTimeCodeInput
          id="OneTimeCodeInput"
          length={5}
          label="Verificationcode"
          ariaLabel="OneTimeCode Input Field"
        />
      )

      expect(screen.getByText(/Verificationcode/i))
    })
  })

  describe('when the label is hidden', () => {
    it('does not show the label', () => {
      const { getByText } = render(
        <OneTimeCodeInput
          length={5}
          id="OneTimeCodeInput"
          ariaLabel="OneTimeCode Input Field"
          label="Verificationcode"
          hideLabel
        />
      )
      const label = getByText(/Verificationcode/i).parentNode
      expect(label).toHaveStyleRule('height', '1px')
      expect(label).toHaveStyleRule('margin-block', '-1px')
    })
  })

  describe('when an onChange event is triggered', () => {
    it('handles the onChange event', async () => {
      const { user } = render(
        <OneTimeCodeInput
          id="OneTimeCodeInput"
          length={5}
          label="Verificationcode"
          ariaLabel="OneTimeCode Input Field"
        />
      )

      await user.type(
        screen.getByRole('textbox', {
          name: /onetimecode input field 1/i,
        }),
        '75689'
      )

      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 1/i })
      ).toHaveDisplayValue(/7/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 2/i })
      ).toHaveDisplayValue(/5/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 3/i })
      ).toHaveDisplayValue(/6/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 4/i })
      ).toHaveDisplayValue(/8/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 5/i })
      ).toHaveDisplayValue(/9/i)
    })
  })

  describe('when the values are pasted from the clipboard', () => {
    it('pastes the values from the clipboard into the input fields', async () => {
      render(
        <OneTimeCodeInput
          id="OneTimeCodeInput"
          length={5}
          label="Verificationcode"
          ariaLabel="OneTimeCode Input Field"
        />
      )

      fireEvent.change(
        screen.getByRole('textbox', {
          name: /onetimecode input field 1/i,
        }),
        { target: { value: '75689' } }
      )

      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 1/i })
      ).toHaveDisplayValue(/7/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 2/i })
      ).toHaveDisplayValue(/5/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 3/i })
      ).toHaveDisplayValue(/6/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 4/i })
      ).toHaveDisplayValue(/8/i)
      expect(
        screen.getByRole('textbox', { name: /onetimecode input field 5/i })
      ).toHaveDisplayValue(/9/i)
    })
  })

  describe('when there is a navigation event', () => {
    describe('and it is an ArrowLeft', () => {
      it('moves left', async () => {
        const { user } = render(
          <OneTimeCodeInput
            id="OneTimeCodeInput"
            length={5}
            label="Verificationcode"
            ariaLabel="OneTimeCode Input Field"
          />
        )

        await user.type(
          screen.getByRole('textbox', {
            name: /onetimecode input field 1/i,
          }),
          '75689'
        )

        await user.type(
          screen.getByRole('textbox', {
            name: /onetimecode input field 5/i,
          }),
          '{arrowleft}'
        )

        expect(
          screen.getByRole('textbox', {
            name: /onetimecode input field 4/i,
          })
        ).toHaveFocus()
      })
    })

    describe('and it is an ArrowRight', () => {
      it('moves right', async () => {
        const { user } = render(
          <OneTimeCodeInput
            id="OneTimeCodeInput"
            length={5}
            label="Verificationcode"
            ariaLabel="OneTimeCode Input Field"
          />
        )

        await user.type(
          screen.getByRole('textbox', {
            name: /onetimecode input field 1/i,
          }),
          '75689'
        )

        await user.type(
          screen.getByRole('textbox', {
            name: /onetimecode input field 4/i,
          }),
          '{arrowright}'
        )

        expect(
          screen.getByRole('textbox', {
            name: /onetimecode input field 5/i,
          })
        ).toHaveFocus()
      })
    })

    describe('and its a Backspace', () => {
      describe('and there is a value', () => {
        it('removes the value', async () => {
          const { user } = render(
            <OneTimeCodeInput
              id="OneTimeCodeInput"
              length={5}
              label="Verificationcode"
              ariaLabel="OneTimeCode Input Field"
            />
          )

          await user.type(
            screen.getByRole('textbox', {
              name: /onetimecode input field 1/i,
            }),
            '75689'
          )

          await user.type(
            screen.getByRole('textbox', {
              name: /onetimecode input field 5/i,
            }),
            '{backspace}'
          )

          await waitFor(() => {
            expect(
              screen.getByRole('textbox', {
                name: /onetimecode input field 5/i,
              })
            ).toHaveDisplayValue('')

            expect(
              screen.getByRole('textbox', {
                name: /onetimecode input field 5/i,
              })
            ).toHaveFocus()
          })
        })
      })

      describe('and there is no value', () => {
        it('moves focus to the previous input field', async () => {
          const { user } = render(
            <OneTimeCodeInput
              id="OneTimeCodeInput"
              length={5}
              label="Verificationcode"
              ariaLabel="OneTimeCode Input Field"
            />
          )

          await user.type(
            screen.getByRole('textbox', {
              name: /onetimecode input field 1/i,
            }),
            '7568'
          )

          await user.type(
            screen.getByRole('textbox', {
              name: /onetimecode input field 5/i,
            }),
            '{backspace}'
          )

          await waitFor(() => {
            expect(
              screen.getByRole('textbox', {
                name: /onetimecode input field 4/i,
              })
            ).toHaveFocus()
          })
        })
      })
    })
  })
})
