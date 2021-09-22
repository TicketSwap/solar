import React from 'react'
import { Toast, ToastProvider, useToast } from './'
import { Button, ButtonSize, ButtonVariant } from '../Button'
import { Select } from '../Select'
import styled from '@emotion/styled'
import { Text } from '../Text'

const ToastContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Wrapper = (story: () => React.ReactNode) => (
  <ToastProvider>{story()}</ToastProvider>
)

function Basic() {
  const { notify } = useToast()

  return (
    <Button
      onClick={() =>
        notify(() => (
          <Toast>
            <ToastContent>Notification</ToastContent>
          </Toast>
        ))
      }
    >
      Show toast
    </Button>
  )
}

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

function WithInput() {
  const { notify } = useToast()

  return (
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
  )
}

function Persistent() {
  const { notify } = useToast()

  return (
    <Button
      onClick={() =>
        notify(remove => (
          <Toast persist>
            <ToastContent>
              <Text>Payment failed</Text>
              <Button
                onClick={remove}
                size={ButtonSize.medium}
                variant={ButtonVariant.secondary}
              >
                Discard
              </Button>
            </ToastContent>
          </Toast>
        ))
      }
    >
      Show toast
    </Button>
  )
}

export const BasicToast = () => <Basic />
export const WithInputToast = () => <WithInput />
export const PersistentToast = () => <Persistent />

BasicToast.storyName = 'Basic'
WithInputToast.storyName = 'With Input'
PersistentToast.storyName = 'Persistent'

export default {
  title: 'Toast',
  decorators: [Wrapper],
}
