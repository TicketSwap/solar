import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { Button } from '../src/components/Button'
import { ToastProvider, ToastConsumer, Toast } from '../src/components/Toast'

describe('Toast', () => {
  it('shows button and renders toasts on button-click', () => {
    const { getByText, getAllByText } = render(
      <ToastProvider>
        <ToastConsumer>
          {({ add }) => (
            <Button onClick={() => add(<Toast>Notification</Toast>)}>
              Show toast
            </Button>
          )}
        </ToastConsumer>
      </ToastProvider>
    )
    expect(getByText(/show toast/i)).toBeInTheDocument()
    fireEvent.click(getByText(/show toast/i))
    fireEvent.click(getByText(/show toast/i))
    expect(getByText(/notification/i)).toBeInTheDocument()
    expect(getAllByText(/notification/i)).toHaveLength(2)
  })

  it('hides toast ', () => {
    const { getByText, queryByText } = render(
      <ToastProvider>
        <ToastConsumer>
          {({ add, remove }) => (
            <Button
              onClick={() =>
                add(
                  <Toast persist>
                    Notification
                    <Button onClick={remove} size="small" variant="inverted">
                      Discard
                    </Button>
                  </Toast>
                )
              }
            >
              Show toast
            </Button>
          )}
        </ToastConsumer>
      </ToastProvider>
    )
    fireEvent.click(getByText(/show toast/i))
    expect(getByText(/notification/i)).toBeInTheDocument()
    fireEvent.click(getByText(/discard/i))
    expect(queryByText(/notification/i)).toBeNull()
  })
})
