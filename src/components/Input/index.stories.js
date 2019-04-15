import React from 'react'
import { storiesOf } from '@storybook/react'
import { Input } from './'
import { Icon } from '../Icon'

storiesOf('Input', module)
  .add('basic', () => <Input id="fname" label="First name" />)
  .add('with hidden label', () => (
    <Input id="fname" label="First name" hideLabel />
  ))
  .add('with helper text', () => (
    <Input id="fname" label="First name" help="Lorem ipsum dolor sit amet" />
  ))
  .add('loading', () => (
    <Input
      placeholder="Search our docs"
      value="Lorem ipsum"
      id="search"
      label="Search"
      hideLabel
      onReset={() => console.log('onClear')}
      loading
    />
  ))
  .add('with icon', () => (
    <Input
      placeholder="Search our docs"
      id="search"
      label="Search"
      hideLabel
      leftAdornment={<Icon glyph="loupe-solid" size={24} />}
    />
  ))
  .add('with icon loading', () => (
    <Input
      placeholder="Search our docs"
      id="search"
      label="Search"
      hideLabel
      leftAdornment={<Icon glyph="loupe-solid" size={24} />}
      loading
    />
  ))
  .add('rounded', () => (
    <Input id="fname" type="search" label="Search" hideLabel rounded />
  ))
  .add('rounded with icon', () => (
    <Input
      id="fname"
      type="search"
      label="Search"
      leftAdornment={<Icon glyph="loupe-solid" size={24} />}
      hideLabel
      rounded
    />
  ))
  .add('with clear button', () => (
    <Input
      type="search"
      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      id="id"
      label="Label"
      onChange={() => console.log('onChange')}
      onReset={() => console.log('onClear')}
    />
  ))
  .add('with custom label props', () => (
    <Input
      value="Lorem ipsum"
      id="id"
      label="Label"
      labelProps={{
        for: 'id',
        'aria-role': 'test',
      }}
      onChange={() => console.log('onChange')}
      onReset={() => console.log('onClear')}
    />
  ))
  .add('as textarea', () => (
    <Input as="textarea" id="message" label="Message" rows="6" />
  ))
