import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from './'
import { Icon } from '../Icon'

storiesOf('Button', module)
  .add('default with text', () => <Button>Default Button</Button>)
  .add('full width', () => <Button width="full">Default Button</Button>)
  .add('small with text', () => <Button size="small">Small Button</Button>)
  .add('with icon', () => <Button icon="checkmark-solid">Save changes</Button>)
  .add('with icon loading', () => (
    <Button icon="checkmark-solid" loading>
      Save changes
    </Button>
  ))
  .add('full width with icon', () => (
    <Button width="full" icon="facebook" variant="facebook">
      Log in with Facebook
    </Button>
  ))
  .add('as hyperlink', () => (
    <Button as="a" href="https://www.ticketswap.com">
      Inspect me
    </Button>
  ))
  .add('secondary', () => <Button variant="secondary">Secondary</Button>)
  .add('inverted', () => <Button variant="inverted">Inverted</Button>)
  .add('inverted disabled', () => (
    <Button variant="inverted" disabled>
      Inverted
    </Button>
  ))
  .add('inverted with icon', () => (
    <Button variant="inverted" icon="plus-solid">
      Inverted
    </Button>
  ))
  .add('success', () => <Button variant="success">Success</Button>)
  .add('warning', () => <Button variant="warning">Warning</Button>)
  .add('danger', () => <Button variant="danger">Danger</Button>)
  .add('loading', () => <Button loading>Loading</Button>)
  .add('disabled', () => <Button disabled>Button</Button>)
  .add('facebook', () => <Button variant="facebook">Facebook</Button>)
  .add('rounded', () => <Button rounded>Rounded</Button>)
  .add('rounded square with icon as child', () => (
    <Button rounded square>
      <Icon glyph="loupe-solid" size={24} />
    </Button>
  ))
  .add('rounded small square with icon as child', () => (
    <Button size="small" rounded square>
      <Icon glyph="loupe-solid" size={24} />
    </Button>
  ))
  .add('regular', () => <button>Button</button>)
