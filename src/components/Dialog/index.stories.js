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
import { Select } from '../Select'
import { Button } from '../Button'
import { Input } from '../Input'
import { Icon } from '../Icon'

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

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
  ))
  .add('useDialog', () => <MyNewDialog />)
