import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToastProvider, ToastConsumer, Toast } from './'
import { Button } from '../Button'

const wrapper = story => <ToastProvider>{story()}</ToastProvider>

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
  .add('persistent', () => (
    <ToastConsumer>
      {({ add, remove }) => (
        <Button
          onClick={() =>
            add(
              <Toast persist>
                <div
                  css={`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                  `}
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
