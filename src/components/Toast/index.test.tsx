import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ToastProvider, ToastConsumer, Toast } from './'

describe('Toast', () => {
  it('shows button and renders toasts on button-click', () => {
    const { getByText, getAllByText } = render(
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
    expect(getByText(/show toast/i)).toBeInTheDocument()
    fireEvent.click(getByText(/show toast/i))
    fireEvent.click(getByText(/show toast/i))
    expect(getAllByText(/notification/i)).toHaveLength(2)
  })

  it('hides toast ', () => {
    const { getByText, queryByText } = render(
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
    fireEvent.click(getByText(/show toast/i))
    expect(getByText(/payment failed/i)).toBeInTheDocument()
    fireEvent.click(getByText(/discard/i))
    expect(queryByText(/payment failed/i)).toBeNull()
  })
})
