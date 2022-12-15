import React, { ReactElement } from 'react'
import { Button } from '../Button'
import { ChevronLeftAlt, CloseAlt } from '../../icons'
import {
  DialogAdornment,
  DialogBody,
  DialogHeader,
  DialogWindow,
  useDialog,
} from '../Dialog'
import { ContentTransition } from '.'

interface Props {
  slots: ReactElement[]
}

export default function WithFlattening({ slots }: Props) {
  const [title, setTitle] = React.useState('')
  const [back, setBack] = React.useState('')
  const initialView = 'one'
  const [activeView, setActiveView] = React.useState(initialView)
  const { hide, getToggleProps, getWindowProps } = useDialog({
    onToggle: on => on && setActiveView(initialView),
  })

  return (
    <>
      <Button {...getToggleProps()}>Show dialog</Button>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>
          {back && (
            <DialogAdornment left>
              <button onClick={() => setActiveView(back)}>
                <ChevronLeftAlt size={24} />
              </button>
            </DialogAdornment>
          )}
          {title}
          <DialogAdornment right>
            <button onClick={hide}>
              <CloseAlt size={24} />
            </button>
          </DialogAdornment>
        </DialogHeader>
        <ContentTransition
          onChange={item => {
            setTitle(item.props.title)
            setBack(item.props.back)
          }}
          activeView={activeView}
        >
          <DialogBody key="one" title="one" back="three">
            <h1>Default body one</h1>
          </DialogBody>
          <DialogBody key="two" title="two" back="one">
            <h1>Default body two</h1>
          </DialogBody>
          <DialogBody key="three" title="three" back="two">
            <h1>Default body three</h1>
          </DialogBody>
          {slots.map(slot => slot)}
        </ContentTransition>
      </DialogWindow>
    </>
  )
}
