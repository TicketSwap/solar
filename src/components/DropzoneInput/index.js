import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { CloseRounded } from '@ticketswap/comets'
import Dropzone from 'react-dropzone'
import {
  color,
  fontSize,
  lineHeight,
  radius,
  space,
  transition,
} from '../../theme'
import { Label, LabelText } from '../Input'
import { VisuallyHidden } from '../VisuallyHidden'

const Wrapper = styled.div`
  align-items: center;
  background-color: ${color.earthLightestAlpha};
  border: 2px dashed ${color.earth};
  border-radius: ${radius.md};
  cursor: pointer;
  display: flex;
  font-size: ${fontSize[18]};
  height: ${space[56]};
  justify-content: center;
  line-height: ${lineHeight.solid};
  padding-bottom: 0;
  padding-left: ${props => (props.left ? space[48] : space[16])};
  padding-right: ${props => (props.right ? space[48] : space[16])};
  padding-top: 0;
  position: relative;
  width: 100%;
`
const Adornment = styled.span`
  align-items: center;
  bottom: 0;
  color: ${color.spaceMedium};
  display: flex;
  justify-content: center;
  left: ${props => (props.left ? 0 : 'auto')};
  overflow: hidden;
  position: absolute;
  right: ${props => (props.right ? 0 : 'auto')};
  top: 0;
  transition: color ${transition};
  width: ${space[48]};
  z-index: 1;
`
const ResetButton = styled.button`
  line-height: 0;
  opacity: 0.35;
  transition: opacity ${transition};

  &:hover,
  &:focus {
    opacity: 0.5;
    outline: 0;
  }
`

export function DropzoneInput({
  hideLabel,
  id,
  label,
  onUpload,
  placeholder,
  ...props
}) {
  let dropzoneRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const handleUploadFile = file => {
    setPreview(file.map(file => file.path))
    onUpload && onUpload(file)
  }

  const handleReset = e => {
    e.stopPropagation()
    setPreview(null)
    onUpload && onUpload(null)
  }

  return (
    <>
      <Label htmlFor={id}>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelText>{label}</LabelText>
          </VisuallyHidden>
        ) : (
          <LabelText>{label}</LabelText>
        )}
      </Label>
      <Wrapper onClick={() => dropzoneRef.open()}>
        {preview ? preview : placeholder}
        {preview && (
          <Adornment right>
            <ResetButton onClick={e => handleReset(e)} type="button">
              <CloseRounded size={16} />
            </ResetButton>
          </Adornment>
        )}
        <Dropzone
          ref={node => {
            dropzoneRef = node
          }}
          accept={'image/jpeg, image/png'}
          disableClick={true}
          multiple={false}
          onDrop={file => handleUploadFile(file)}
        >
          {({ getInputProps }) => <input id={id} {...getInputProps()} />}
        </Dropzone>
      </Wrapper>
    </>
  )
}

DropzoneInput.propTypes = {
  hideLabel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
}
