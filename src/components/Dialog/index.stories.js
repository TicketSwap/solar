import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Dialog,
  DialogWindow,
  DialogHeader,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  useDialog,
} from './'
import { Button } from '../Button'
import { Input } from '../Input'
import { Icon } from '../Icon'

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
                  <Icon glyph="close" size={24} />
                </button>
              </DialogAdornment>
            )}
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
        </DialogWindow>
      </>
    )}
  </Dialog>
)

function MyNewDialog() {
  const { hide, getToggleProps, getWindowProps } = useDialog({
    onToggle: val => console.log(val),
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

storiesOf('Dialog', module)
  .add('basic', () => <MyDialog>Body</MyDialog>)
  .add('default on', () => <MyDialog defaultOn>Body</MyDialog>)
  .add('show on mount', () => <MyDialog showOnMount>Body</MyDialog>)
  .add('show on mount and persist', () => (
    <MyDialog showOnMount persist>
      Body
    </MyDialog>
  ))
  .add('with long body', () => (
    <MyDialog>
      <div>
        <Input id="email" type="email" label="Email address" />
        <Input id="fname" label="First name" />
        <Input id="lname" label="Last name" />
        <Input id="message" label="Message" as="textarea" rows="4" />
      </div>
    </MyDialog>
  ))
  .add('useDialog', () => <MyNewDialog />)
