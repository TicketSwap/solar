import React from 'react'
import { Button, ButtonVariant } from '.'
import { Checkmark, Facebook, MagnifyingGlass, Plus } from '@ticketswap/comets'

const Primary = () => <Button>Default Button</Button>
const FullWidth = () => <Button width="full">Default Button</Button>

FullWidth.storyName = 'Full-width'

const Small = () => <Button size="small">Small Button</Button>

const WithIcon = () => (
  <Button leftAdornment={<Checkmark size={24} />}>Save changes</Button>
)

WithIcon.storyName = 'With icon'

const WithIconLoading = () => (
  <Button loading leftAdornment={<Checkmark size={24} />}>
    Save changes
  </Button>
)

WithIconLoading.storyName = 'With icon loading'

const FullWidthWithIcon = () => (
  <Button
    width="full"
    variant={ButtonVariant.facebook}
    leftAdornment={<Facebook size={24} />}
  >
    Log in with Facebook
  </Button>
)

FullWidthWithIcon.storyName = 'Full-width with icon'

const AsHyperlink = () => (
  <Button as="a" href="https://www.ticketswap.com">
    Inspect me
  </Button>
)

AsHyperlink.storyName = 'As hyperlink'

const Secondary = () => (
  <Button variant={ButtonVariant.secondary}>Secondary</Button>
)
const SecondaryWithIcon = () => (
  <Button
    variant={ButtonVariant.secondary}
    leftAdornment={<Facebook size={24} />}
  >
    Secondary
  </Button>
)

SecondaryWithIcon.storyName = 'Secondary with icon'

const Caution = () => (
  <Button variant={ButtonVariant.caution}>Turn off alerts</Button>
)
const Inverted = () => (
  <Button variant={ButtonVariant.inverted}>Inverted</Button>
)

const InvertedDisabled = () => (
  <Button variant={ButtonVariant.inverted} disabled>
    Inverted
  </Button>
)

InvertedDisabled.storyName = 'Inverted disabled'

const InvertedWithIcon = () => (
  <Button variant={ButtonVariant.inverted} leftAdornment={<Plus size={24} />}>
    Inverted
  </Button>
)

InvertedWithIcon.storyName = 'Inverted with icon'

const Success = () => <Button variant={ButtonVariant.success}>Success</Button>
const Warning = () => <Button variant={ButtonVariant.warning}>Warning</Button>
const Danger = () => <Button variant={ButtonVariant.danger}>Danger</Button>
const Loading = () => <Button loading>Loading</Button>
const Disabled = () => <Button disabled>Button</Button>

const DisabledSuccess = () => (
  <Button variant={ButtonVariant.success} disabled>
    Button
  </Button>
)

DisabledSuccess.storyName = 'Disabled success'

const DisabledWarning = () => (
  <Button variant={ButtonVariant.warning} disabled>
    Button
  </Button>
)

DisabledWarning.storyName = 'Disabled warning'

const DisabledDanger = () => (
  <Button variant={ButtonVariant.danger} disabled>
    Button
  </Button>
)

DisabledDanger.storyName = 'Disabled danger'

const DisabledSecondary = () => (
  <Button variant={ButtonVariant.secondary} disabled>
    Button
  </Button>
)

DisabledSecondary.storyName = 'Disabled secondary'

const DisabledCaution = () => (
  <Button variant={ButtonVariant.caution} disabled>
    Button
  </Button>
)

DisabledCaution.storyName = 'Disabled caution'

const DisabledFacebook = () => (
  <Button variant={ButtonVariant.facebook} disabled>
    Button
  </Button>
)

DisabledFacebook.storyName = 'Disabled facebook'

const FacebookButton = () => (
  <Button variant={ButtonVariant.facebook}>Facebook</Button>
)

FacebookButton.storyName = 'Facebook'

const Rounded = () => <Button rounded>Rounded</Button>

const RoundedSquareWithIconAsChild = () => (
  <Button rounded square>
    <MagnifyingGlass size={24} />
  </Button>
)

RoundedSquareWithIconAsChild.storyName = 'Rounded square with icon as child'

const RoundedSmallSquareWithIconAsChild = () => (
  <Button size="small" rounded square>
    <MagnifyingGlass size={24} />
  </Button>
)

RoundedSmallSquareWithIconAsChild.storyName =
  'Rounded small square with icon as child'

const Regular = () => <button>Button</button>

export {
  Regular,
  Primary,
  FullWidth,
  Small,
  WithIconLoading,
  FullWidthWithIcon,
  AsHyperlink,
  Secondary,
  SecondaryWithIcon,
  Caution,
  Inverted,
  InvertedDisabled,
  InvertedWithIcon,
  Success,
  Warning,
  Danger,
  Loading,
  Disabled,
  DisabledSuccess,
  DisabledWarning,
  DisabledDanger,
  DisabledSecondary,
  DisabledCaution,
  DisabledFacebook,
  FacebookButton,
  Rounded,
  RoundedSquareWithIconAsChild,
  RoundedSmallSquareWithIconAsChild,
}

export default {
  title: 'Button',
}
