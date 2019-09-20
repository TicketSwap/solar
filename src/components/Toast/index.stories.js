import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToastProvider, ToastConsumer, Toast, useToast } from './'
import { Button } from '../Button'

const wrapper = story => <ToastProvider>{story()}</ToastProvider>

function NetworkStatus() {
  const { notify } = useToast()
  const reset = React.useRef(null)

  React.useEffect(() => {
    function handleStatusChange({ type }) {
      if (type === 'offline') {
        notify(remove => {
          reset.current = remove
          return <Toast persist>You are offline</Toast>
        })
      } else {
        reset.current()
      }
    }

    window.addEventListener('online', handleStatusChange)
    window.addEventListener('offline', handleStatusChange)

    return () => {
      window.removeEventListener('online', handleStatusChange)
      window.removeEventListener('offline', handleStatusChange)
    }
  }, [notify])

  return null
}

function UseToast() {
  const { notify } = useToast()
  return (
    <Button
      onClick={() =>
        notify(remove => (
          <Toast>
            Notification<button onClick={remove}>Close</button>
          </Toast>
        ))
      }
    >
      Show toast
    </Button>
  )
}

storiesOf('Toast', module)
  .addDecorator(wrapper)
  .add('basic', () => (
    <ToastConsumer>
      {({ notify }) => (
        <Button onClick={() => notify(() => <Toast>Notification</Toast>)}>
          Show toast
        </Button>
      )}
    </ToastConsumer>
  ))
  .add('useToast()', () => <UseToast />)
  .add('NetworkStatus', () => <NetworkStatus />)
  .add('persistent', () => (
    <ToastConsumer>
      {({ notify }) => (
        <Button
          onClick={() =>
            notify(remove => (
              <Toast persist>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Payment failed</span>
                  <Button onClick={remove} size="small" variant="secondary">
                    Discard
                  </Button>
                </div>
              </Toast>
            ))
          }
        >
          Show toast
        </Button>
      )}
    </ToastConsumer>
  ))
