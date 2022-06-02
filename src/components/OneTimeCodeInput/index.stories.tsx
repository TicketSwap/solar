import React from 'react'
import { OneTimeCodeInput } from './index'
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogWindow,
} from '../Dialog'
import { Button } from '../Button'

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
                label="Verificationcode"
                helpText="Enter your 6 digit code here"
                ariaLabel="One Time Code Input Field:"
                validate={true}
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
                label="Verificationcode"
                helpText="Enter your 3 digit code here"
                ariaLabel="One Time Code Input Field:"
                validate={true}
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

export const WithFocusOnMount = () => {
  return (
    <Dialog on>
      {({ getWindowProps }) => (
        <>
          <DialogWindow {...getWindowProps()}>
            <DialogHeader>One Time Code Input</DialogHeader>
            <DialogBody>
              <OneTimeCodeInput
                focusOnMount={true}
                length={4}
                id="otc-input"
                label="Verificationcode"
                helpText="Enter your 6 digit code here"
                ariaLabel="One Time Code Input Field:"
                validate={true}
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
                label="Verificationcode"
                helpText="Enter your 8 digit code here"
                ariaLabel="One Time Code Input Field:"
                validate={true}
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
  title: 'Components/Inputs/OneTimeCodeInput',
}
