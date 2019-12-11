import React, { useRef, useState } from 'react'
import { Input } from './'
import { MagnifyingGlass } from '@ticketswap/comets'

export default {
  title: 'Input',
}

export const Basic = () => <Input id="fname" label="First name" />

export const WithHiddenLabel = () => (
  <Input id="fname" label="First name" hideLabel />
)

WithHiddenLabel.story = {
  name: 'With hidden label',
}

export const WithHelperText = () => (
  <Input id="fname" label="First name" help="Lorem ipsum dolor sit amet" />
)

WithHelperText.story = {
  name: 'With helper text',
}

export const Loading = () => (
  <Input
    placeholder="Search our docs"
    value="Lorem ipsum"
    id="search"
    label="Search"
    hideLabel
    onReset={() => console.log('onClear')}
    loading
  />
)

export const WithIcon = () => (
  <Input
    placeholder="Search our docs"
    id="search"
    label="Search"
    hideLabel
    leftAdornment={<MagnifyingGlass size={24} />}
  />
)

WithIcon.story = {
  name: 'With icon',
}

export const WithIconLoading = () => (
  <Input
    placeholder="Search our docs"
    id="search"
    label="Search"
    hideLabel
    leftAdornment={<MagnifyingGlass size={24} />}
    loading
  />
)

WithIconLoading.story = {
  name: 'With icon loading',
}

export const Rounded = () => (
  <Input id="fname" type="search" label="Search" hideLabel rounded />
)

export const RoundedWithIcon = () => (
  <Input
    id="fname"
    type="search"
    label="Search"
    leftAdornment={<MagnifyingGlass size={24} />}
    hideLabel
    rounded
  />
)

RoundedWithIcon.story = {
  name: 'Rounded with icon',
}

export const WithClearButton = () => {
  const [value, setValue] = React.useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  )

  return (
    <Input
      type="search"
      value={value}
      id="id"
      label="Label"
      onChange={event => {
        setValue(event.target.value)
        console.log('onChange')
      }}
      onReset={() => console.log('onClear')}
    />
  )
}

WithClearButton.story = {
  name: 'With clear button',
}

export const UncontrolledInput = () => {
  const [query, setQuery] = useState('')
  const inputRef = useRef()

  function handleReset() {
    setQuery('')
    console.log(query)
    inputRef.current.value = ''
  }

  return (
    <Input
      type="search"
      ref={inputRef}
      id="id"
      label="Label"
      onChange={event => setQuery(event.target.value)}
      onReset={handleReset}
    />
  )
}

UncontrolledInput.story = {
  name: 'Uncontrolled input',
}

export const WithCustomLabelProps = () => (
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
)

WithCustomLabelProps.story = {
  name: 'With custom label props',
}

export const WithError = () => <Input id="id" label="Label" validate={false} />

WithError.story = {
  name: 'With error',
}

export const AsTextarea = () => (
  <Input as="textarea" id="message" label="Message" rows="6" />
)

AsTextarea.story = {
  name: 'As textarea',
}
