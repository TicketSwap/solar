import React, { TextareaHTMLAttributes, ReactNode, Ref } from 'react'
import styled from '@emotion/styled'

type TextareaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>

export interface TextareaProps extends TextareaAttributes {
  'aria-label': string
  validate?: boolean // props:validate/invalid form validation. to be continued...
}

export const Textarea: React.FC<TextareaProps> = ({ ...props }) => {
  return <textarea {...props}></textarea>
}
