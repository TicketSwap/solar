import React from 'react'
import { Toast, ToastConsumer, ToastProvider, useToast } from './'
import { Button, ButtonSize, ButtonVariant } from '../Button'
import { Select } from '../Select'
import { Combobox } from '../Combobox'

const Wrapper = (story: () => React.ReactNode) => (
  <ToastProvider>{story()}</ToastProvider>
)

function UseToast() {
  const { notify } = useToast()
  return (
    <Button
      onClick={() =>
        notify(remove => (
          <Toast>
            Notification
            <button onClick={remove}>Close</button>
          </Toast>
        ))
      }
    >
      Show toast
    </Button>
  )
}

export default {
  title: 'Toast',
  decorators: [Wrapper],
}

export const Basic = () => (
  <ToastConsumer>
    {({ notify }) => (
      <Button onClick={() => notify(() => <Toast>Notification</Toast>)}>
        Show toast
      </Button>
    )}
  </ToastConsumer>
)

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

export const WithInput = () => (
  <ToastConsumer>
    {({ notify }) => (
      <Button
        onClick={() =>
          notify(() => (
            <Toast persist>
              <Select
                items={items}
                id="language"
                label="Language"
                help="Select a language"
                onChange={selection => console.log(selection)}
                initialSelectedItem={items[1]}
              />
            </Toast>
          ))
        }
      >
        Show toast
      </Button>
    )}
  </ToastConsumer>
)

const tickets = [
  { value: '1', name: '1 ticket' },
  { value: '2', name: '2 tickets' },
  { value: '3', name: '3 tickets' },
  { value: '4', name: '4 tickets' },
  { value: '5', name: '5 tickets' },
  { value: '6', name: '6 tickets' },
]

export const withCombobox = () => (
  <ToastConsumer>
    {({ notify }) => (
      <Button
        onClick={() =>
          notify(() => (
            <Toast persist>
              <Combobox id="Combobox" label="Combobox" items={tickets} />
            </Toast>
          ))
        }
      >
        Show toast
      </Button>
    )}
  </ToastConsumer>
)

export const WithToast = () => <UseToast />

WithToast.storyName = 'useToast()'

export const Persistent = () => (
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
                <Button
                  onClick={remove}
                  size={ButtonSize.medium}
                  variant={ButtonVariant.secondary}
                >
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
)
