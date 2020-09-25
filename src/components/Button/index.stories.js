import React from 'react'
import { Button } from './'
import { Checkmark, Facebook, MagnifyingGlass, Plus } from '@ticketswap/comets'

export default {
  title: 'Button',
}

export const Primary = () => <Button>Default Button</Button>
export const FullWidth = () => <Button width="full">Default Button</Button>

FullWidth.storyName = 'Full-width'

export const Small = () => <Button size="small">Small Button</Button>

export const WithIcon = () => (
  <Button leftAdornment={<Checkmark size={24} />}>Save changes</Button>
)

WithIcon.storyName = 'With icon'

export const WithIconLoading = () => (
  <Button loading leftAdornment={<Checkmark size={24} />}>
    Save changes
  </Button>
)

WithIconLoading.storyName = 'With icon loading'

export const FullWidthWithIcon = () => (
  <Button
    width="full"
    variant="facebook"
    leftAdornment={<Facebook size={24} />}
  >
    Log in with Facebook
  </Button>
)

FullWidthWithIcon.storyName = 'Full-width with icon'

export const AsHyperlink = () => (
  <Button as="a" href="https://www.ticketswap.com">
    Inspect me
  </Button>
)

AsHyperlink.storyName = 'As hyperlink'

export const Secondary = () => <Button variant="secondary">Secondary</Button>
export const SecondaryWithIcon = () => (
  <Button variant="secondary" leftAdornment={<Facebook size={24} />}>
    Secondary
  </Button>
)

SecondaryWithIcon.storyName = 'Secondary with icon'

export const Caution = () => <Button variant="caution">Turn off alerts</Button>
export const Inverted = () => <Button variant="inverted">Inverted</Button>

export const InvertedDisabled = () => (
  <Button variant="inverted" disabled>
    Inverted
  </Button>
)

InvertedDisabled.storyName = 'Inverted disabled'

export const InvertedWithIcon = () => (
  <Button variant="inverted" leftAdornment={<Plus size={24} />}>
    Inverted
  </Button>
)

InvertedWithIcon.storyName = 'Inverted with icon'

export const Success = () => <Button variant="success">Success</Button>
export const Warning = () => <Button variant="warning">Warning</Button>
export const Danger = () => <Button variant="danger">Danger</Button>
export const Loading = () => <Button loading>Loading</Button>
export const Disabled = () => <Button disabled>Button</Button>

export const DisabledSuccess = () => (
  <Button variant="success" disabled>
    Button
  </Button>
)

DisabledSuccess.storyName = 'Disabled success'

export const DisabledWarning = () => (
  <Button variant="warning" disabled>
    Button
  </Button>
)

DisabledWarning.storyName = 'Disabled warning'

export const DisabledDanger = () => (
  <Button variant="danger" disabled>
    Button
  </Button>
)

DisabledDanger.storyName = 'Disabled danger'

export const DisabledSecondary = () => (
  <Button variant="secondary" disabled>
    Button
  </Button>
)

DisabledSecondary.storyName = 'Disabled secondary'

export const DisabledCaution = () => (
  <Button variant="caution" disabled>
    Button
  </Button>
)

DisabledCaution.storyName = 'Disabled caution'

export const DisabledFacebook = () => (
  <Button variant="facebook" disabled>
    Button
  </Button>
)

DisabledFacebook.storyName = 'Disabled facebook'

export const FacebookButton = () => <Button variant="facebook">Facebook</Button>

FacebookButton.storyName = 'Facebook'

export const Rounded = () => <Button rounded>Rounded</Button>

export const RoundedSquareWithIconAsChild = () => (
  <Button rounded square>
    <MagnifyingGlass size={24} />
  </Button>
)

RoundedSquareWithIconAsChild.storyName = 'Rounded square with icon as child'

export const RoundedSmallSquareWithIconAsChild = () => (
  <Button size="small" rounded square>
    <MagnifyingGlass size={24} />
  </Button>
)

RoundedSmallSquareWithIconAsChild.storyName =
  'Rounded small square with icon as child'

export const Regular = () => <button>Button</button>
