import React from 'react'
import { Alert } from './'

export default {
  title: 'Alert',
}

export const Info = () => (
  <Alert>
    <a href="https://example.com">Paypal</a> is not activated yet.
  </Alert>
)

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

WithAction.story = {
  name: 'With action',
}

export const InfoWithPrimaryAction = () => (
  <Alert
    primaryAction={{
      label: 'More info',
      onClick: () => console.log('primaryAction clicked'),
    }}
  >
    Last time you didn’t finish your listing. You can continue below or create a
    new listing.
  </Alert>
)

InfoWithPrimaryAction.story = {
  name: 'Info with primary action',
}

export const InfoWithSecondaryAction = () => (
  <Alert
    secondaryAction={{
      label: 'Create new listing',
      onClick: () => console.log('secondaryAction clicked'),
    }}
  >
    Last time you didn’t finish your listing. You can continue below or create a
    new listing.
  </Alert>
)

InfoWithSecondaryAction.story = {
  name: 'Info with secondary action',
}

export const Success = () => (
  <Alert
    variant="success"
    primaryAction={{
      label: 'View',
      onClick: () => console.log('primaryAction clicked'),
    }}
  >
    Wanted <a href="https://example.com">listing</a> created!
  </Alert>
)

export const Error = () => (
  <Alert
    variant="error"
    primaryAction={{
      label: 'Fix',
      onClick: () => console.log('primaryAction clicked'),
    }}
  >
    There’s a currency <a href="https://example.com">mismatch</a>
  </Alert>
)

export const Warning = () => (
  <Alert
    variant="warning"
    primaryAction={{
      label: 'Turn on',
      onClick: () => console.log('primaryAction clicked'),
    }}
  >
    <a href="https://example.com">Notifications</a> are disabled
  </Alert>
)
