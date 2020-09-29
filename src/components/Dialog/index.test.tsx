import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Button, ButtonVariant } from '../Button'
import { Close } from '@ticketswap/comets'
import {
  Dialog,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogWindow,
} from './'

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

  it('renders overlay, window, header, body and footer when clicking the toggle', () => {
    const { getByText, getByTestId } = render(<MyDialog>Body</MyDialog>)
    fireEvent.click(getByText(/show dialog/i))
    expect(getByTestId('dialog-overlay')).toBeInTheDocument()
    expect(getByTestId('dialog-content')).toBeInTheDocument()
    expect(getByText(/dialog title/i)).toBeInTheDocument()
    expect(getByText(/body/i)).toBeInTheDocument()
    expect(getByText(/discard/i)).toBeInTheDocument()
  })

  it('closes the dialog when clicking the overlay', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <MyDialog>Body</MyDialog>
    )
    fireEvent.click(getByText(/show dialog/i))
    fireEvent.click(getByTestId('dialog-overlay'))
    expect(queryByTestId('dialog-content')).toBeNull()
  })

  it('closes the dialog when clicking the close-button', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <MyDialog>Body</MyDialog>
    )
    fireEvent.click(getByText(/show dialog/i))
    fireEvent.click(getByTestId('close-button'))
    expect(queryByTestId('dialog-content')).toBeNull()
  })
})
