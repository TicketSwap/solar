import React, { TextareaHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { fontSize, lineHeight, space, color, radius, shadow } from '../../theme'

const StyledTextarea = styled.textarea`
  font-family: inherit;
  width: 100%;
  min-height: ${space[64]};
  font-size: ${fontSize[18]};
  line-height: ${lineHeight.copy};
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  color: ${color.foreground};
  border-radius: ${radius.md};
  background-color: ${color.elevatedBackground};
  resize: vertical;
  // Future proofing (still experimental)
  resize: block;

  &:focus {
    outline: none;
    box-shadow: ${shadow.strong};
    background-color: ${color.background};
  }

  &::placeholder {
    color: ${color.foregroundSubtle};
  }

  &:disabled {
    background-color: ${color.inactiveBackground};
    cursor: not-allowed;
  }
`

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  'aria-label': string
}

export const Textarea = (props: TextareaProps) => <StyledTextarea {...props} />
