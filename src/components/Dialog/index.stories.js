import React from 'react'
import {
  Dialog,
  DialogWindow,
  DialogHeader,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  useDialog,
} from './'
import { Select } from '../Select'
import { Button } from '../Button'
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

const MyDialog = ({ children, ...props }) => (
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
            <Button onClick={() => console.log('clicked')} width="full">
              Save changes
            </Button>
            <Button
              onClick={hide}
              variant="caution"
              width="full"
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
    onToggle: on => console.log(on),
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
  title: 'Dialog',
}

export const Basic = () => <MyDialog>Body</MyDialog>
export const DefaultOn = () => <MyDialog defaultOn>Body</MyDialog>

DefaultOn.story = {
  name: 'Default on',
}

export const DefaultOnAndPersist = () => (
  <MyDialog defaultOn persist>
    Body
  </MyDialog>
)

DefaultOnAndPersist.story = {
  name: 'Default on and persist',
}

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

WithLongBody.story = {
  name: 'With long body',
}

export const WithHook = () => <HooksDialog />

WithHook.story = {
  name: 'useDialog()',
}

export const Controlled = () => <ControlledDialog />
