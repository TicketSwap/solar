import React from 'react'
import { screen, render } from '../../../test/test.utils'
import { ToastProvider, ToastConsumer, Toast } from './'

describe('Toast', () => {
  it('shows button and renders toasts on button-click', async () => {
    const { user } = render(
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
    await user.click(await screen.findByText(/show toast/i))
    await user.click(await screen.findByText(/show toast/i))
    expect(await screen.findAllByText(/notification/i)).toHaveLength(2)
  })

  it('hides toast', async () => {
    const { user } = render(
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
    await user.click(await screen.findByText(/show toast/i))
    expect(await screen.findByText(/payment failed/i)).toBeInTheDocument()
    await user.click(await screen.findByText(/discard/i))
    expect(screen.queryByText(/payment failed/i)).toBeNull()
  })
})
