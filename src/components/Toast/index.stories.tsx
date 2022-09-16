import React from 'react'
import { Toast, ToastProvider, useToast } from './'
import { Button, ButtonSize, ButtonVariant } from '../Button'
import { BaseButton } from '../BaseButton'
import { Select } from '../Select'
import styled from '@emotion/styled'
import { CheckmarkRounded } from '../../icons'
import { color, space } from '../../theme'
import { Dialog, DialogBody, DialogHeader, DialogWindow } from '../Dialog'

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
    <Button onClick={() => notify(() => <Toast>Notification</Toast>)}>
      Show toast
    </Button>
  )
}

function WithAdornment() {
  const { notify } = useToast()

  return (
    <Button
      onClick={() =>
        notify(() => (
          <Toast
            persist
            leftAdornment={<CheckmarkRounded color={color.titan} size={24} />}
          >
            Your preferences have been successfully updated
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
              <span>Payment failed</span>

              <BaseButton onClick={remove}>Discard</BaseButton>
            </ToastContent>
          </Toast>
        ))
      }
    >
      Show toast
    </Button>
  )
}

const ButtonWrapper = styled.div`
  display: grid;
  grid-gap: ${space[8]};
`

function PersistentWithAdornment() {
  const { notify } = useToast()

  return (
    <ButtonWrapper>
      <Button
        onClick={() =>
          notify(remove => (
            <Toast
              persist
              leftAdornment={<CheckmarkRounded color={color.titan} size={24} />}
            >
              <ToastContent>
                <span>Your preferences have been successfully updated</span>

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
        Show toast with multiple lines
      </Button>
      <Button
        onClick={() =>
          notify(remove => (
            <Toast
              persist
              leftAdornment={<CheckmarkRounded color={color.titan} size={24} />}
            >
              <ToastContent>
                <span>Saved!</span>

                <BaseButton onClick={remove}>Discard</BaseButton>
              </ToastContent>
            </Toast>
          ))
        }
      >
        Show toast with one line
      </Button>
    </ButtonWrapper>
  )
}

const WithDialog = () => {
  const { notify } = useToast()

  return (
    <Dialog>
      {({ hide, getToggleProps, getWindowProps }) => (
        <>
          <Button {...getToggleProps()}>Show dialog</Button>
          <DialogWindow {...getWindowProps()}>
            <DialogHeader>Dialog Title</DialogHeader>
            <DialogBody>
              <Button
                onClick={() =>
                  notify(() => <Toast persist>Notification</Toast>)
                }
              >
                Show toast
              </Button>
            </DialogBody>
          </DialogWindow>
        </>
      )}
    </Dialog>
  )
}

export const BasicToast = () => <Basic />
export const WithAdornmentToast = () => <WithAdornment />
export const WithInputToast = () => <WithInput />
export const PersistentToast = () => <Persistent />
export const PersistentWithAdornmentToast = () => <PersistentWithAdornment />
export const withDialogToast = () => <WithDialog />

BasicToast.storyName = 'Basic'
WithAdornmentToast.storyName = 'With Adornment'
WithInputToast.storyName = 'With Input'
PersistentToast.storyName = 'Persistent'
PersistentWithAdornmentToast.storyName = 'Persistent with Adornment'

export default {
  title: 'Components/Feedback/Toast',
  decorators: [Wrapper],
}
