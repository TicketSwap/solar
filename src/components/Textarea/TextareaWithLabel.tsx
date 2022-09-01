import React, { ReactElement } from 'react'
import { Label } from '../Label'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Textarea, TextareaProps } from './Textarea'

const Wrapper = styled.span`
  display: grid;
  grid-gap: ${space[4]};
  grid-template-columns: 100%;
`

interface TextareaWithAriaLabel extends TextareaProps {
  id: string
  instruction?: ReactElement
  label?: string
}

interface TextareaWithRequiredLabel
  extends Omit<TextareaWithAriaLabel, 'aria-label'> {
  label: string
  'aria-label'?: string
}

export type TextareaWithLabelProps =
  | TextareaWithAriaLabel
  | TextareaWithRequiredLabel

export const TextareaWithLabel = ({
  id,
  instruction,
  label,
  'aria-label': ariaLabel,
  ...props
}: TextareaWithLabelProps) => (
  <Wrapper>
    {label && <Label htmlFor={id}>{label}</Label>}
    <Textarea id={id} aria-label={(ariaLabel || label) as string} {...props} />
    {instruction}
  </Wrapper>
)
