import React from 'react'
import { Dropzone } from '.'
import { CloseAlt, File } from '../../icons'
import { BaseButton } from '../BaseButton'
import {
  DialogAdornment,
  DialogBody,
  DialogHeader,
  DialogWindow,
  useDialog,
} from '../Dialog'
import { Text } from '../Text'
import { DropzoneVariant } from './Dropzone'

export default {
  title: 'Components/Actions/Dropzone',
}

export const Default = () => (
  <>
    <Dropzone
      title="Upload PDF or Apple Wallet tickets"
      subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
      action="Drop files here or click here to select"
      mobileAction="Select a file"
      dropTitle="Release"
      onFileChange={file => console.log(file)}
    />
  </>
)

Default.storyName = 'Default'

export const Small = () => (
  <>
    <Dropzone
      title="Upload PDF or Apple Wallet tickets"
      subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
      action="Drop files here or click here to select"
      mobileAction="Select a file"
      dropTitle="Release"
      variant={DropzoneVariant.small}
      onFileChange={file => console.log(file)}
    />
  </>
)

Small.storyName = 'Small'

export const WithFileRestrictions = () => {
  const { show, hide, getWindowProps } = useDialog()

  return (
    <>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>
          Something went wrong
          <DialogAdornment right>
            <button onClick={hide}>
              <CloseAlt size={24} />
            </button>
          </DialogAdornment>
        </DialogHeader>
        <DialogBody>
          <Text>
            The file you uploaded is not supported. We only accept PDF or PKPASS
            (Apple Wallet) files. Screenshots or scans of physical tickets
            converted to PDF format are not allowed.
          </Text>
        </DialogBody>
      </DialogWindow>
      <Dropzone
        title="Upload PDF or Apple Wallet tickets"
        subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
        action="Drop files here or click here to select"
        mobileAction="Select a file"
        dropTitle="Release"
        accept={['.pdf']}
        onFileChange={file => console.log(file)}
        onUnacceptedFileChange={show}
      />
    </>
  )
}

WithFileRestrictions.storyName = 'With Restrictions'

export const Multiple = () => {
  const { show, hide, getWindowProps } = useDialog()

  return (
    <>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>
          Something went wrong
          <DialogAdornment right>
            <button onClick={hide}>
              <CloseAlt size={24} />
            </button>
          </DialogAdornment>
        </DialogHeader>
        <DialogBody>
          <Text>
            The file you uploaded is not supported. We only accept PDF or PKPASS
            (Apple Wallet) files. Screenshots or scans of physical tickets
            converted to PDF format are not allowed.
          </Text>
        </DialogBody>
      </DialogWindow>
      <Dropzone
        title="Upload PDF or Apple Wallet tickets"
        subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
        action="Drop files here or click here to select"
        mobileAction="Select a file"
        dropTitle="Release"
        multiple
        accept={['.pdf']}
        onFileChange={file => console.log(file)}
        onUnacceptedFileChange={show}
      />
    </>
  )
}

Multiple.storyName = 'Accepts Multiple'

export const SecondaryAction = () => {
  const { show, hide, getWindowProps } = useDialog()

  return (
    <>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>
          Help
          <DialogAdornment right>
            <button onClick={hide}>
              <CloseAlt size={24} />
            </button>
          </DialogAdornment>
        </DialogHeader>
        <DialogBody>
          <Text>
            Since it’s not possible to download Go Mobile tickets from
            Ticketmaster, you can upload screenshots of them instead. Each
            screenshot must contain only one fully visible ticket.
          </Text>
        </DialogBody>
      </DialogWindow>
      <Dropzone
        title="Upload PDF or Apple Wallet tickets"
        subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
        action="Drop files here or click here to select"
        secondaryAction={
          <BaseButton
            leftAdornment={<File size={20} />}
            onClick={event => {
              event.stopPropagation()
              show()
            }}
          >
            View example
          </BaseButton>
        }
        mobileAction="Select a file"
        dropTitle="Release"
        onFileChange={file => console.log(file)}
      />
    </>
  )
}

SecondaryAction.storyName = 'Secondary Action'
