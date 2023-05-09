import React from 'react'
import { screen, render } from '../../../test/test.utils'
import { Button, ButtonVariant } from '../Button'
import { Close } from '../../icons'
import {
  Dialog,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogWindow,
  useDialog,
} from './'

const HooksDialog: React.FC = () => {
  const { hide, getToggleProps, getWindowProps } = useDialog({
    persist: false,
  })

  return (
    <>
      <Button {...getToggleProps()}>Show dialog</Button>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>Dialog Title</DialogHeader>
        <DialogBody>Body</DialogBody>
        <DialogFooter>
          <Button onClick={hide}>Close</Button>
        </DialogFooter>
      </DialogWindow>
    </>
  )
}

const MyDialog: React.FC = ({ children, ...props }) => (
  <Dialog {...props}>
    {({ hide, getToggleProps, getWindowProps }) => (
      <>
        <Button {...getToggleProps()}>Show dialog</Button>
        <DialogWindow {...getWindowProps()}>
          <DialogHeader>
            Dialog Title
            <DialogAdornment right>
              <button onClick={hide} data-testid="close-button">
                <Close size={24} />
              </button>
            </DialogAdornment>
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
          <DialogFooter>
            <Button onClick={hide} variant={ButtonVariant.danger}>
              Discard
            </Button>
          </DialogFooter>
        </DialogWindow>
      </>
    )}
  </Dialog>
)

describe('Dialog', () => {
  it('renders the toggle', () => {
    const { getByText } = render(<MyDialog>Body</MyDialog>)
    expect(getByText(/show dialog/i)).toBeInTheDocument()
  })

  it('renders overlay, window, header, body and footer when clicking the toggle', async () => {
    const { getByText, getByTestId, user } = render(<MyDialog>Body</MyDialog>)
    await user.click(getByText(/show dialog/i))
    expect(getByTestId('dialog-overlay')).toBeInTheDocument()
    expect(getByTestId('dialog-content')).toBeInTheDocument()
    expect(getByText(/dialog title/i)).toBeInTheDocument()
    expect(getByText(/body/i)).toBeInTheDocument()
    expect(getByText(/discard/i)).toBeInTheDocument()
  })

  it('closes the dialog when clicking the overlay', async () => {
    const { getByText, getByTestId, queryByTestId, user } = render(
      <MyDialog>Body</MyDialog>
    )
    await user.click(getByText(/show dialog/i))
    await user.click(getByTestId('dialog-overlay'))
    expect(queryByTestId('dialog-content')).toBeNull()
  })

  it('closes the dialog when clicking the close-button', async () => {
    const { getByText, getByTestId, queryByTestId, user } = render(
      <MyDialog>Body</MyDialog>
    )
    await user.click(getByText(/show dialog/i))
    await user.click(getByTestId('close-button'))
    expect(queryByTestId('dialog-content')).toBeNull()
  })

  describe('useDialog', () => {
    describe('when the toggle is pressed', () => {
      it('opens the dialog', async () => {
        const { user } = render(<HooksDialog />)

        await user.click(screen.getByRole('button', { name: /show dialog/i }))

        const title = await screen.findByText(/Dialog title/i)
        const body = await screen.findByText(/Body/i)

        expect(title).toBeInTheDocument()
        expect(body).toBeInTheDocument()
      })
    })

    describe('when the close button is pressed', () => {
      it('closes the dialog', async () => {
        const { user } = render(<HooksDialog />)

        await user.click(screen.getByRole('button', { name: /show dialog/i }))

        await screen.findByText(/Dialog title/i)

        await user.click(screen.getByRole('button', { name: /close/i }))

        expect(screen.queryByText(/Dialog title/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Body/i)).not.toBeInTheDocument()
      })
    })
  })
})
