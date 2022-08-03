import React, { useState } from 'react'
import { OneTimeCodeInput } from '.'
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogWindow,
} from '../Dialog'
import { Button } from '../Button'
import { Instruction } from '../Instruction'

export const Basic = () => {
  return (
    <Dialog on>
      {({ getWindowProps }) => (
        <>
          <DialogWindow {...getWindowProps()}>
            <DialogHeader>One Time Code Input</DialogHeader>
            <DialogBody>
              <OneTimeCodeInput
                length={6}
                id="otc-input"
                legend="Verificationcode"
                instruction={
                  <Instruction>Enter your 6 digit code here</Instruction>
                }
                aria-label="One Time Code Input Field:"
                onChange={value => console.log(value)}
                inputProps={{ pattern: '\\d*', inputMode: 'numeric' }}
              />
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => console.log('submitted')} fullWidth>
                Submit
              </Button>
            </DialogFooter>
          </DialogWindow>
        </>
      )}
    </Dialog>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState('1234')
  return (
    <Dialog on>
      {({ getWindowProps }) => (
        <>
          <DialogWindow {...getWindowProps()}>
            <DialogHeader>One Time Code Input</DialogHeader>
            <DialogBody>
              <OneTimeCodeInput
                length={6}
                value={value}
                id="otc-input"
                legend="Verificationcode"
                instruction={
                  <Instruction>Enter your 6 digit code here</Instruction>
                }
                aria-label="One Time Code Input Field:"
                onChange={event => {
                  console.log(event)
                  setValue(event.target.value)
                }}
              />
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => console.log('submitted')} fullWidth>
                Submit
              </Button>
            </DialogFooter>
          </DialogWindow>
        </>
      )}
    </Dialog>
  )
}

export const ShortCode = () => {
  return (
    <Dialog on>
      {({ getWindowProps }) => (
        <>
          <DialogWindow {...getWindowProps()}>
            <DialogHeader>One Time Code Input</DialogHeader>
            <DialogBody>
              <OneTimeCodeInput
                length={3}
                id="otc-input"
                legend="Verificationcode"
                instruction={
                  <Instruction>Enter your 3 digit code here</Instruction>
                }
                aria-label="One Time Code Input Field:"
                onChange={value => console.log(value)}
              />
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => console.log('submitted')} fullWidth>
                Submit
              </Button>
            </DialogFooter>
          </DialogWindow>
        </>
      )}
    </Dialog>
  )
}

export const LongCode = () => {
  return (
    <Dialog on>
      {({ getWindowProps }) => (
        <>
          <DialogWindow {...getWindowProps()}>
            <DialogHeader>One Time Code Input</DialogHeader>
            <DialogBody>
              <OneTimeCodeInput
                length={8}
                id="otc-input"
                legend="Verificationcode"
                instruction={
                  <Instruction>Enter your 8 digit code here</Instruction>
                }
                aria-label="One Time Code Input Field:"
                onChange={value => console.log(value)}
              />
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => console.log('submitted')} fullWidth>
                Submit
              </Button>
            </DialogFooter>
          </DialogWindow>
        </>
      )}
    </Dialog>
  )
}

export default {
  title: 'Components/Inputs/OneTimeCodeInputV2',
}
