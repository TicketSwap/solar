import React from 'react'
import { BaseButton, BaseButtonSize, ButtonVariant } from './'
import { File } from '../../icons'
import styled from '@emotion/styled'

const ButtonWrapper = styled.div`
  button {
    display: block;
    margin-bottom: 16px;
  }
`

export const Basic = () => (
  <ButtonWrapper>
    <BaseButton onClick={() => alert('Clicked')}>Default medium</BaseButton>
    <BaseButton size={BaseButtonSize.small} onClick={() => alert('Clicked')}>
      Default small
    </BaseButton>
  </ButtonWrapper>
)

export const WithIcon = () => (
  <ButtonWrapper>
    <BaseButton leftAdornment={<File size={24} />}>View example</BaseButton>
    <BaseButton size={BaseButtonSize.small} leftAdornment={<File size={16} />}>
      View example
    </BaseButton>
  </ButtonWrapper>
)

export const Success = () => (
  <ButtonWrapper>
    <BaseButton variant={ButtonVariant.success}>Success</BaseButton>
    <BaseButton size={BaseButtonSize.small} variant={ButtonVariant.success}>
      Success
    </BaseButton>
  </ButtonWrapper>
)

export const Warning = () => (
  <ButtonWrapper>
    <BaseButton variant={ButtonVariant.warning}>Warning</BaseButton>
    <BaseButton size={BaseButtonSize.small} variant={ButtonVariant.warning}>
      Warning
    </BaseButton>
  </ButtonWrapper>
)

export const Danger = () => (
  <ButtonWrapper>
    <BaseButton variant={ButtonVariant.danger}>Danger</BaseButton>
    <BaseButton size={BaseButtonSize.small} variant={ButtonVariant.danger}>
      Danger
    </BaseButton>
  </ButtonWrapper>
)

export const Disabled = () => (
  <ButtonWrapper>
    <BaseButton disabled>Disabled</BaseButton>
    <BaseButton size={BaseButtonSize.small} disabled>
      Disabled
    </BaseButton>
  </ButtonWrapper>
)

export default {
  title: 'Components/Actions/BaseButton',
}
