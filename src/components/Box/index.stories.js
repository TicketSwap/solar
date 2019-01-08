import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './'
import { Input } from '../Input'

storiesOf('Box', module)
  .add('basic', () => (
    <Box display="grid" gridTemplateColumnsMd="2" gridGap={16} gridGapMd={32}>
      <Input id="fname" label="First name" />
      <Input id="lname" label="Last name" />
    </Box>
  ))
  .add('responsive margin', () => (
    <>
      <Box marginBottom={16} marginBottomMd={0}>
        <Input id="fname" label="First name" hideLabel />
      </Box>
      <Box>
        <Input id="fname" label="First name" hideLabel />
      </Box>
    </>
  ))
