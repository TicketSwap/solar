import React from 'react'
import { Alert } from './'

export default {
  title: 'Alert',
}

export const Basic = () => (
  <Alert>
    <a href="https://example.com">PayPal</a> is not activated yet.
  </Alert>
)

export const WithTitleAndAction = () => (
  <Alert
    title="Friendly reminder"
    action={{
      label: 'Activate PayPal',
      onClick: () => console.log('action default clicked'),
    }}
  >
    We’ve noticed that your PayPal is not activated yet.
  </Alert>
)

WithTitleAndAction.storyName = 'With title and action'

export const WithAction = () => (
  <>
    <Alert
      action={{
        label: 'Continue creating',
        onClick: () => console.log('action default clicked'),
      }}
    >
      Last time you didn’t finish your listing. You can continue below or create
      a new listing.
    </Alert>
    <br />
    <Alert
      variant="success"
      action={{
        label: 'Start sharing',
        onClick: () => console.log('action success clicked'),
      }}
    >
      Your listing is published! You can share it on social media to increase
      the change of selling the ticket.
    </Alert>
    <br />
    <Alert
      variant="error"
      action={{
        label: 'Continue creating',
        onClick: () => console.log('action error clicked'),
      }}
    >
      Your phone number seems to be invalid. To continue you need to verify it
      again.
    </Alert>
    <br />
    <Alert
      variant="warning"
      action={{
        label: 'Tips and tricks',
        onClick: () => console.log('action warning clicked'),
      }}
    >
      Be aware that this is a hugely popular event, which means that lots of
      people are looking for tickets and the demand is very high. We put
      together some crucial tips and tricks on how to be first when tickets
      become available. Good luck! We’re pulling for you!
    </Alert>
  </>
)

WithAction.storyName = 'With action'

export const Success = () => (
  <Alert
    variant="success"
    action={{
      label: 'View',
      onClick: () => console.log('action clicked'),
    }}
  >
    Wanted <a href="https://example.com">listing</a> created!
  </Alert>
)

export const Error = () => (
  <Alert
    variant="error"
    action={{
      label: 'Fix',
      onClick: () => console.log('action clicked'),
    }}
  >
    There’s a currency <a href="https://example.com">mismatch</a>
  </Alert>
)

export const Warning = () => (
  <Alert
    variant="warning"
    action={{
      label: 'Turn on',
      onClick: () => console.log('action clicked'),
    }}
  >
    <a href="https://example.com">Notifications</a> are disabled
  </Alert>
)
