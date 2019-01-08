import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToastProvider, ToastConsumer, Toast } from './'
import { Button } from '../Button'
import { Box } from '../Box'

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
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <span>Payment failed</span>
                  <Button onClick={remove} size="small" variant="inverted">
                    Discard
                  </Button>
                </Box>
              </Toast>
            )
          }
        >
          Show toast
        </Button>
      )}
    </ToastConsumer>
  ))
