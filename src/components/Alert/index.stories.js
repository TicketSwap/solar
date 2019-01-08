import React from 'react'
import { storiesOf } from '@storybook/react'
import { Alert } from './'

storiesOf('Alert', module)
  .add('info', () => <Alert>Paypal is not activated yet.</Alert>)
  .add('info with primary action', () => (
    <Alert
      primaryAction={{
        label: 'More info',
        onClick: () => console.log('primaryAction clicked'),
      }}
    >
      Last time you didn’t finish your listing. You can continue below or create
      a new listing.
    </Alert>
  ))
  .add('info with secondary action', () => (
    <Alert
      secondaryAction={{
        label: 'Create new listing',
        onClick: () => console.log('secondaryAction clicked'),
      }}
    >
      Last time you didn’t finish your listing. You can continue below or create
      a new listing.
    </Alert>
  ))
  .add('success', () => (
    <Alert
      variant="success"
      primaryAction={{
        label: 'View',
        onClick: () => console.log('primaryAction clicked'),
      }}
    >
      Wanted listing created!
    </Alert>
  ))
  .add('error', () => (
    <Alert
      variant="error"
      primaryAction={{
        label: 'Fix',
        onClick: () => console.log('primaryAction clicked'),
      }}
    >
      There’s a currency mismatch
    </Alert>
  ))
  .add('warning', () => (
    <Alert
      variant="warning"
      primaryAction={{
        label: 'Turn on',
        onClick: () => console.log('primaryAction clicked'),
      }}
    >
      Notifications are disabled
    </Alert>
  ))
