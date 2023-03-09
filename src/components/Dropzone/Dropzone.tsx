import React, {
  useState,
  ChangeEvent,
  DragEvent,
  useRef,
  ReactNode,
} from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  color,
  space,
  radius,
  transition,
  fontWeight,
  device,
} from '../../theme'
import { H4 } from '../Heading'
import { SmallText } from '../Text'
import { BaseButton } from '../BaseButton'
import { Button } from '../Button'
import { FilesIllustration } from './FilesIllustration'
import { ArrowUpRounded } from '../../icons'

interface DropOverlayProps {
  isDragging: boolean
}

export enum DropzoneVariant {
  default = 'default',
  small = 'small',
  light = 'light',
}

export interface DropzoneProps {
  title?: string
  subtitle?: string
  action: string
  mobileAction?: string
  secondaryAction?: ReactNode
  dropTitle: string
  accept?: string[]
  multiple?: boolean
  ariaLabel?: string
  variant?: DropzoneVariant
  onFileChange: (files: FileList | File) => void
  onUnacceptedFileChange?: () => void
}

interface InformationStyles {
  variant: DropzoneVariant
}

interface DropAreaStyles {
  variant: DropzoneVariant
}

interface DesktopUIStyles {
  variant: DropzoneVariant
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

  * {
    pointer-events: none;
  }

  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`

const DropArea = styled.div<DropAreaStyles>`
  display: flex;
  flex-direction: column;
  align-items: center;
  inline-size: 100%;
  border-radius: ${radius.lg};
  padding-block-start: ${({ variant }) =>
    variant === DropzoneVariant.light ? space[24] : space[16]};
  padding-block-end: ${({ variant }) =>
    variant === DropzoneVariant.light ? space[40] : space[24]};
  padding-inline: ${space[16]};
  text-align: center;
  position: relative;
  background-color: ${({ variant }) =>
    variant === DropzoneVariant.light
      ? 'transparent'
      : color.elevatedBackground};

  @media ${device.tablet} {
    flex-direction: ${({ variant }) =>
      variant === DropzoneVariant.small ? 'row' : 'column'};
    background-color: ${color.actionBackground};
    border-inline-size: 2px;
    border-style: dashed;
    border-color: ${({ variant }) =>
      variant === DropzoneVariant.light ? color.actionFocus : color.action};
  }
`

const StyledFilesIllustration = styled(FilesIllustration)`
  cursor: pointer;
`

const Title = styled(H4)`
  font-weight: ${fontWeight.semiBold};
`

const Information = styled.div<InformationStyles>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-block-start: ${space[12]};
  flex: 1;
  gap: ${space[8]};
  inline-size: 100%;

  @media ${device.tablet} {
    align-items: ${({ variant }) =>
      variant === DropzoneVariant.small ? 'flex-start' : 'center'};
    text-align: ${({ variant }) =>
      variant === DropzoneVariant.small ? 'left' : 'center'};
  }
`

const FileInput = styled.input`
  display: none;
`

const DesktopUI = styled.div<DesktopUIStyles>`
  display: none;

  @media ${device.tablet} {
    display: flex;
    flex-direction: ${({ variant }) =>
      variant === DropzoneVariant.small ? 'row' : 'column'};
    gap: ${({ variant }) =>
      variant === DropzoneVariant.small ? space[32] : space[24]};
  }
`

const MobileUI = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space[16]};
  inline-size: 100%;

  @media ${device.tablet} {
    display: none;
  }
`

export const Dropzone = ({
  title,
  subtitle,
  action,
  secondaryAction,
  mobileAction,
  dropTitle,
  accept = ['*'],
  multiple = false,
  ariaLabel,
  variant = DropzoneVariant.default,
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
        ({ name }) => !accept.includes(`.${name.split('.').at(-1)}`)
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
    <DropArea
      data-testid="droparea"
      variant={variant}
      onDragEnter={onDragEnter}
    >
      <DropOverlay
        data-testid="dropoverlay"
        isDragging={isDragging}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragExit={onDragExit}
        onDrop={onDrop}
      >
        <StyledFilesIllustration
          width="170px"
          height="100px"
          alt={dropTitle}
          onClick={onButtonClick}
        />
        <h2>{dropTitle}</h2>
      </DropOverlay>

      <>
        {variant !== DropzoneVariant.light && (
          <StyledFilesIllustration
            width="170px"
            height="100px"
            alt={dropTitle}
            onClick={onButtonClick}
          />
        )}
        <Information variant={variant}>
          {title && <Title>{title}</Title>}
          {subtitle && <SmallText>{subtitle}</SmallText>}
          <DesktopUI variant={variant}>
            <BaseButton type="button" onClick={onButtonClick}>
              {action}
            </BaseButton>
            <FileInput
              type="file"
              aria-label={ariaLabel}
              ref={inputFile}
              accept={accept.join(',')}
              multiple={multiple}
              onChange={onSelectFile}
            />
            {secondaryAction && <>{secondaryAction}</>}
          </DesktopUI>
          <MobileUI>
            {variant === DropzoneVariant.light ? (
              <Button
                type="button"
                fullWidth
                variant="secondary"
                leftAdornment={<ArrowUpRounded size={24} />}
                onClick={onButtonClick}
              >
                {mobileAction ?? action}
              </Button>
            ) : (
              <>
                <Button type="button" fullWidth onClick={onButtonClick}>
                  {mobileAction ?? action}
                </Button>
                {secondaryAction && <>{secondaryAction}</>}
              </>
            )}
          </MobileUI>
        </Information>
      </>
    </DropArea>
  )
}
