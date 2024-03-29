import React, { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogWindow,
  useDialog,
} from './'
import { ContentTransition } from '../ContentTransition'
import { Select } from '../Select'
import { Button, ButtonVariant } from '../Button'
import { Input } from '../InputV2'
import { ChevronLeftAlt, CloseAlt } from '../../icons'
import { Textarea } from '../Textarea'
import { BaseButton } from '../BaseButton'

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
      <Textarea id="message" label="Message" rows={4} />
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

export const WithContentTransition = () => {
  const [activeView, setActiveView] = useState('overview')
  const [title, setTitle] = useState('')
  const [back, setBack] = useState('')

  const { hide, getToggleProps, getWindowProps } = useDialog({
    onToggle: (on: any) => console.log(on),
    onEntered: () => console.log('entered'),
    onExited: () => console.log('exited'),
  })

  return (
    <>
      <Button {...getToggleProps()}>Show dialog</Button>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>
          {title}
          <DialogAdornment right>
            <BaseButton onClick={hide}>
              <CloseAlt size={24} />
            </BaseButton>
          </DialogAdornment>

          <DialogAdornment left>
            <BaseButton onClick={() => setActiveView(back)}>
              <ChevronLeftAlt size={24} />
            </BaseButton>
          </DialogAdornment>
        </DialogHeader>
        <ContentTransition
          activeView={activeView}
          onChange={({ props }) => {
            props.title && setTitle(props.title)
            props.back && setBack(props.back)
          }}
        >
          <DialogBody key="overview" title="Overview">
            <BaseButton onClick={() => setActiveView('errors')}>
              Go to errors
            </BaseButton>
          </DialogBody>
          <DialogBody key="errors" title="Errors" back="overview">
            <BaseButton onClick={() => setActiveView('confirmation')}>
              Go to confirmation
            </BaseButton>
          </DialogBody>
          <DialogBody key="confirmation" title="Confirmation" back="errors">
            <BaseButton onClick={() => setActiveView('overview')}>
              Go to overview
            </BaseButton>
          </DialogBody>
        </ContentTransition>
      </DialogWindow>
    </>
  )
}

WithContentTransition.storyName = 'With Content Transistion'
