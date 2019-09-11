import React from 'react'
import { storiesOf } from '@storybook/react'
import { BaseButton } from './'

storiesOf('BaseButton', module)
  .add('default', () => <BaseButton>Default</BaseButton>)
  .add('success', () => <BaseButton variant="success">Success</BaseButton>)
  .add('warning', () => <BaseButton variant="warning">Warning</BaseButton>)
  .add('danger', () => <BaseButton variant="danger">Danger</BaseButton>)
  .add('disabled', () => <BaseButton disabled>Disabled</BaseButton>)
