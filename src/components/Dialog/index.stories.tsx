import { ReactNode, useState } from 'react'
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
import { CloseAlt } from '../../icons'

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

const BasicDialog = ({
  children,
  ...props
}: {
  children: ReactNode
  persist?: boolean
  defaultOn?: boolean
}) => (
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

const ControlledDialog = () => {
  const [show, setShow] = useState(false)
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

const HooksDialog = () => {
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

export const Basic = () => <BasicDialog>Body</BasicDialog>
export const DefaultOn = () => <BasicDialog defaultOn>Body</BasicDialog>

DefaultOn.storyName = 'Default on'

export const DefaultOnAndPersist = () => (
  <BasicDialog defaultOn persist>
    Body
  </BasicDialog>
)

DefaultOnAndPersist.storyName = 'Default on and persist'

export const WithLongBody = () => (
  <BasicDialog>
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
  </BasicDialog>
)

WithLongBody.storyName = 'With long body'

export const WithHook = () => <HooksDialog />

WithHook.storyName = 'useDialog()'

export const Controlled = () => <ControlledDialog />
