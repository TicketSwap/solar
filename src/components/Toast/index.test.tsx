import React from 'react'
import { screen, render } from '@testing-library/react'
import { ToastProvider, ToastConsumer, Toast } from './'
import userEvent from '@testing-library/user-event'

describe('Toast', () => {
  it('shows button and renders toasts on button-click', async () => {
    render(
      <ToastProvider>
        <ToastConsumer>
          {({ notify }) => (
            <button onClick={() => notify(() => <Toast>Notification</Toast>)}>
              Show toast
            </button>
          )}
        </ToastConsumer>
      </ToastProvider>
    )

    expect(await screen.findByText(/show toast/i)).toBeInTheDocument()
    userEvent.click(await screen.findByText(/show toast/i))
    userEvent.click(await screen.findByText(/show toast/i))
    expect(await screen.findAllByText(/notification/i)).toHaveLength(2)
  })

  it('hides toast', async () => {
    render(
      <ToastProvider>
        <ToastConsumer>
          {({ notify }) => (
            <button
              onClick={() =>
                notify(remove => (
                  <Toast persist>
                    Payment failed
                    <button onClick={remove}>Discard</button>
                  </Toast>
                ))
              }
            >
              Show toast
            </button>
          )}
        </ToastConsumer>
      </ToastProvider>
    )
    userEvent.click(await screen.findByText(/show toast/i))
    expect(await screen.findByText(/payment failed/i)).toBeInTheDocument()
    userEvent.click(await screen.findByText(/discard/i))
    expect(screen.queryByText(/payment failed/i)).toBeNull()
  })
})
