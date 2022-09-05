import React from 'react'
import { Dropzone } from '.'

export default {
  title: 'Components/Actions/Dropzone',
}

export const Default = () => (
  <Dropzone
    title="Upload PDF or Apple Wallet tickets"
    subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
    action="Drop files here or click here to select"
    onFileChange={file => console.log(file)}
  />
)

Default.storyName = 'Default'

export const WithFileRestrictions = () => (
  <Dropzone
    title="Upload PDF or Apple Wallet tickets"
    subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
    action="Drop files here or click here to select"
    accept={['.pdf']}
    onFileChange={file => console.log(file)}
  />
)

WithFileRestrictions.storyName = 'With Restrictions'
