import React, { useState, ChangeEvent, DragEvent, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { color, space, radius, transition, fontWeight } from '../../theme'
import { H4 } from '../Heading'
import { SmallText } from '../Text'
import { BaseButton } from '../BaseButton'
import { FilesIllustration } from './FilesIllustration'

interface DropOverlayProps {
  isDragging: boolean
}

export interface DropzoneProps {
  title: string
  subtitle: string
  action: string
  mobileAction?: string
  dropTitle: string
  accept?: string[]
  multiple?: boolean
  ariaLabel?: string
  onFileChange: (files: FileList | File) => void
  onUnacceptedFileChange?: () => void
}

const DropOverlay = styled.div<DropOverlayProps>`
  position: fixed;
  inset: 0;
  background-color: ${color.actionBackground};
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: ${transition};
  h2 {
    margin-block: 0;
    margin-inline: 0;
  }
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`

const DropArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${color.actionBackground};
  border-radius: ${radius.lg};
  padding-block-start: ${space[16]};
  padding-block-end: ${space[24]};
  padding-inline: ${space[16]};
  text-align: center;
  position: relative;
  border: 2px dashed ${color.earth};
`

const StyledFilesIllustration = styled(FilesIllustration)`
  cursor: pointer;
`

const Title = styled(H4)`
  font-weight: ${fontWeight.semiBold};
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-block-start: ${space[12]};
  flex: 1;
  gap: ${space[8]};
`

const FileInput = styled.input`
  display: none;
`

export const Dropzone = ({
  title,
  subtitle,
  action,
  dropTitle,
  accept = ['*'],
  multiple = false,
  ariaLabel,
  onFileChange,
  onUnacceptedFileChange,
}: DropzoneProps) => {
  const inputFile = useRef<HTMLInputElement | null>(null)
  const [isDragging, setDragging] = useState(false)

  const onButtonClick = () => inputFile.current?.click()
  const onDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault()
  const onDragLeave = () => setDragging(false)
  const onDragExit = () => setDragging(false)

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)

    if (
      accept[0] !== '*' &&
      Array.from(e.dataTransfer.files).some(
        ({ name }) => !accept.includes(`.${name.split('.')[1]}`)
      )
    ) {
      if (onUnacceptedFileChange) {
        onUnacceptedFileChange()
      }

      return
    }

    multiple
      ? onFileChange(e.dataTransfer.files)
      : onFileChange(e.dataTransfer.files[0])
  }

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      multiple ? onFileChange(e.target.files) : onFileChange(e.target.files[0])
    }
  }

  return (
    <DropArea data-testid="droparea" onDragEnter={onDragEnter}>
      <DropOverlay
        data-testid="dropoverlay"
        isDragging={isDragging}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragExit={onDragExit}
        onDrop={onDrop}
      >
        <img src={ILLUSTRATION} alt={dropTitle} />
        <h2>{dropTitle}</h2>
      </DropOverlay>

      <>
        <StyledFilesIllustration width="170px" height="100px" />
        <Information>
          <Title>{title}</Title>
          <SmallText>{subtitle}</SmallText>
          <BaseButton onClick={onButtonClick}>{action}</BaseButton>
          <FileInput
            type="file"
            aria-label={ariaLabel}
            ref={inputFile}
            accept={accept.join(',')}
            multiple={multiple}
            onChange={onSelectFile}
          />
        </Information>
      </>
    </DropArea>
  )
}
