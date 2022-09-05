import React, { ChangeEvent, useRef } from 'react'
import styled from '@emotion/styled'
import { color, space, radius, fontWeight } from '../../theme'
import { H4 } from '../Heading'
import { SmallText } from '../Text'
import { BaseButton } from '../BaseButton'
import { FilesIllustration } from './FilesIllustration'

export interface DropzoneProps {
  title: string
  subtitle: string
  action: string
  mobileAction?: string
  dropTitle: string
  accept?: string[]
  multiple?: boolean
  ariaLabel?: string
  onFileChange: Function
  onUnacceptedFileChange?: Function
}

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
  accept = ['*'],
  ariaLabel,
  onFileChange,
}: DropzoneProps) => {
  const inputFile = useRef<HTMLInputElement | null>(null)

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      onFileChange(e.target.files[0])
    }
  }

  return (
    <DropArea data-testid="droparea">
      <>
        <StyledFilesIllustration width="170px" height="100px" />
        <Information>
          <Title>{title}</Title>
          <SmallText>{subtitle}</SmallText>
          <BaseButton>{action}</BaseButton>
          <FileInput
            type="file"
            aria-label={ariaLabel}
            ref={inputFile}
            accept={accept.join(',')}
            onChange={onSelectFile}
          />
        </Information>
      </>
    </DropArea>
  )
}
