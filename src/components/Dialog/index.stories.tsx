import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogWindow,
  useDialog,
} from './'
import { Select } from '../Select'
import { Button, ButtonVariant } from '../Button'
import { Input } from '../Input'
import { CloseAlt } from '@ticketswap/comets'

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

function ControlledDialog() {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <Button
        onClick={() => setShow(!show)}
        style={{ position: 'absolute', zIndex: 2147483647 }}
      >
        Toggle
      </Button>
      <Dialog on={show} onToggle={console.log}>
        {({ getWindowProps }) => (
          <DialogWindow
            {...getWindowProps({
              onClick: () => show && setShow(false),
              onEscKeyDown: () => show && setShow(false),
            })}
          >
            <DialogHeader>Hi</DialogHeader>
            <DialogBody>I am a controlled dialog</DialogBody>
          </DialogWindow>
        )}
      </Dialog>
    </>
  )
}

interface MyDialogProps {
  children: ReactNode
  persist?: boolean
  defaultOn?: boolean
}

const MyDialog = ({ children, ...props }: MyDialogProps) => (
  <Dialog {...props}>
    {({ hide, getToggleProps, getWindowProps }) => (
      <>
        <Button {...getToggleProps()}>Show dialog</Button>
        <DialogWindow {...getWindowProps()}>
          <DialogHeader>
            Dialog Title
            {!props.persist && (
              <DialogAdornment right>
                <button onClick={hide}>
                  <CloseAlt size={24} />
                </button>
              </DialogAdornment>
            )}
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
          <DialogFooter>
            <Button onClick={() => console.log('clicked')} fullWidth>
              Save changes
            </Button>
            <Button
              onClick={hide}
              variant={ButtonVariant.caution}
              fullWidth
              style={{ marginTop: 8 }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogWindow>
      </>
    )}
  </Dialog>
)

function HooksDialog() {
  const { hide, getToggleProps, getWindowProps } = useDialog({
    onToggle: (on: any) => console.log(on),
    onEntered: () => console.log('entered'),
    onExited: () => console.log('exited'),
  })
  return (
    <>
      <Button {...getToggleProps()}>Show dialog</Button>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>Dialog Title</DialogHeader>
        <DialogBody>Body</DialogBody>
        <DialogFooter>
          <Button onClick={hide}>Discard</Button>
        </DialogFooter>
      </DialogWindow>
    </>
  )
}

export default {
  title: 'Components/Surfaces/Dialog',
}

export const Basic = () => <MyDialog>Body</MyDialog>
export const DefaultOn = () => <MyDialog defaultOn>Body</MyDialog>

DefaultOn.storyName = 'Default on'

export const DefaultOnAndPersist = () => (
  <MyDialog defaultOn persist>
    Body
  </MyDialog>
)

DefaultOnAndPersist.storyName = 'Default on and persist'

export const WithLongBody = () => (
  <MyDialog>
    <div style={{ display: 'grid', gridGap: 16 }}>
      <Input id="email" type="email" label="Email address" />
      <Input id="fname" label="First name" />
      <Input id="lname" label="Last name" />
      <Input id="message" label="Message" as="textarea" rows="4" />
      <Select
        items={items}
        id="language"
        label="Language"
        onChange={selection => console.log(selection)}
        initialSelectedItem={items[1]}
      />
    </div>
  </MyDialog>
)

WithLongBody.storyName = 'With long body'

export const WithHook = () => <HooksDialog />

WithHook.storyName = 'useDialog()'

export const Controlled = () => <ControlledDialog />
