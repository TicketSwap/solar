import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToastProvider, ToastConsumer, Toast, useToast } from './'
import { Button } from '../Button'

const wrapper = story => <ToastProvider>{story()}</ToastProvider>

function ComponentWithHook() {
  const { add } = useToast()
  return (
    <Button onClick={() => add(<Toast>Notification</Toast>)}>Show toast</Button>
  )
}

storiesOf('Toasts', module)
  .addDecorator(wrapper)
  .add('basic', () => (
    <ToastConsumer>
      {({ add }) => (
        <Button onClick={() => add(<Toast>Notification</Toast>)}>
          Show toast
        </Button>
      )}
    </ToastConsumer>
  ))
  .add('useToast()', () => <ComponentWithHook />)
  .add('persistent', () => (
    <ToastConsumer>
      {({ add, remove }) => (
        <Button
          onClick={() =>
            add(
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
                  <Button onClick={remove} size="small" variant="inverted">
                    Discard
                  </Button>
                </div>
              </Toast>
            )
          }
        >
          Show toast
        </Button>
      )}
    </ToastConsumer>
  ))
