import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flag } from './'

storiesOf('Flag', module).add('basic', () => <Flag countryCode="at" />)
