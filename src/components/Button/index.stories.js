import React from 'react'
import { Button } from './'
import { Checkmark, Facebook, MagnifyingGlass, Plus } from '@ticketswap/comets'

export default {
  title: 'Button',
}

export const Primary = () => <Button>Default Button</Button>
export const FullWidth = () => <Button width="full">Default Button</Button>

FullWidth.story = {
  name: 'Full-width',
}

export const Small = () => <Button size="small">Small Button</Button>

export const WithIcon = () => (
  <Button leftAdornment={<Checkmark size={24} />}>Save changes</Button>
)

WithIcon.story = {
  name: 'With icon',
}

export const WithIconLoading = () => (
  <Button loading leftAdornment={<Checkmark size={24} />}>
    Save changes
  </Button>
)

WithIconLoading.story = {
  name: 'With icon loading',
}

export const FullWidthWithIcon = () => (
  <Button
    width="full"
    variant="facebook"
    leftAdornment={<Facebook size={24} />}
  >
    Log in with Facebook
  </Button>
)

FullWidthWithIcon.story = {
  name: 'Full-width with icon',
}

export const AsHyperlink = () => (
  <Button as="a" href="https://www.ticketswap.com">
    Inspect me
  </Button>
)

AsHyperlink.story = {
  name: 'As hyperlink',
}

export const Secondary = () => <Button variant="secondary">Secondary</Button>
export const Caution = () => <Button variant="caution">Turn off alerts</Button>
export const Inverted = () => <Button variant="inverted">Inverted</Button>

export const InvertedDisabled = () => (
  <Button variant="inverted" disabled>
    Inverted
  </Button>
)

InvertedDisabled.story = {
  name: 'Inverted disabled',
}

export const InvertedWithIcon = () => (
  <Button variant="inverted" leftAdornment={<Plus size={24} />}>
    Inverted
  </Button>
)

InvertedWithIcon.story = {
  name: 'Inverted with icon',
}

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

DisabledSuccess.story = {
  name: 'Disabled success',
}

export const DisabledWarning = () => (
  <Button variant="warning" disabled>
    Button
  </Button>
)

DisabledWarning.story = {
  name: 'Disabled warning',
}

export const DisabledDanger = () => (
  <Button variant="danger" disabled>
    Button
  </Button>
)

DisabledDanger.story = {
  name: 'Disabled danger',
}

export const DisabledSecondary = () => (
  <Button variant="secondary" disabled>
    Button
  </Button>
)

DisabledSecondary.story = {
  name: 'Disabled secondary',
}

export const DisabledCaution = () => (
  <Button variant="caution" disabled>
    Button
  </Button>
)

DisabledCaution.story = {
  name: 'Disabled caution',
}

export const DisabledFacebook = () => (
  <Button variant="facebook" disabled>
    Button
  </Button>
)

DisabledFacebook.story = {
  name: 'Disabled facebook',
}

export const FacebookButton = () => <Button variant="facebook">Facebook</Button>

FacebookButton.story = {
  name: 'Facebook',
}

export const Rounded = () => <Button rounded>Rounded</Button>

export const RoundedSquareWithIconAsChild = () => (
  <Button rounded square>
    <MagnifyingGlass size={24} />
  </Button>
)

RoundedSquareWithIconAsChild.story = {
  name: 'Rounded square with icon as child',
}

export const RoundedSmallSquareWithIconAsChild = () => (
  <Button size="small" rounded square>
    <MagnifyingGlass size={24} />
  </Button>
)

RoundedSmallSquareWithIconAsChild.story = {
  name: 'Rounded small square with icon as child',
}

export const Regular = () => <button>Button</button>
