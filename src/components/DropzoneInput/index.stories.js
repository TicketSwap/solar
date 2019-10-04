import React from 'react'
import styled from '@emotion/styled'
import { DropzoneInput } from './'
import { color } from '../../theme'

export default {
  title: 'DropzoneInput',
}

const Span = styled.span`
  color: ${color.earth};
`

const Placeholder = () => {
  return (
    <p>
      Drag your file here or <Span>select a file</Span>
    </p>
  )
}

export const Basic = () => (
  <DropzoneInput
    id="id"
    label="Upload document"
    onUpload={file => console.log(file)}
    placeholder={<Placeholder />}
  />
)
