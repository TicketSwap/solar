import React, { useRef, useState } from 'react'
import { Input } from './'
import { MagnifyingGlass } from '../../icons'

export default {
  title: 'Components/Inputs/Deprecated/Input',
}

export const Basic = () => <Input id="fname" label="First name" onChange={console.log} />

export const Disabled = () => <Input id="fname" label="First name" disabled={true} />

export const WithHiddenLabel = () => <Input id="fname" label="First name" hideLabel />

WithHiddenLabel.storyName = 'With hidden label'

export const WithHelperText = () => (
  <Input id="fname" label="First name" help="Lorem ipsum dolor sit amet" />
)

WithHelperText.storyName = 'With helper text'

export const Loading = () => (
  <Input
    placeholder="Search our docs"
    value="Lorem ipsum"
    id="search"
    label="Search"
    hideLabel
    onReset={() => console.log('onClear')}
    onChange={() => console.log('onChange')}
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

WithIcon.storyName = 'With icon'

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

WithIconLoading.storyName = 'With icon loading'

export const Rounded = () => <Input id="fname" type="search" label="Search" hideLabel rounded />

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

RoundedWithIcon.storyName = 'Rounded with icon'

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
        setValue((event.target as HTMLInputElement).value)
        console.log('onChange')
      }}
      onReset={() => console.log('onClear')}
    />
  )
}

WithClearButton.storyName = 'With clear button'

export const UncontrolledInput = () => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleReset() {
    setQuery('')
    console.log(query)
    const node = inputRef.current || null
    if (node) node.value = ''
  }

  return (
    <Input
      type="search"
      ref={inputRef}
      id="id"
      label="Label"
      onChange={event => setQuery((event.target as HTMLInputElement).value)}
      onReset={handleReset}
    />
  )
}

UncontrolledInput.storyName = 'Uncontrolled input'

export const WithCustomLabelProps = () => (
  <Input
    value="Lorem ipsum"
    id="id"
    label="Label"
    labelProps={{
      htmlFor: 'id',
      'aria-label': 'menu-item',
    }}
    onChange={() => console.log('onChange')}
    onReset={() => console.log('onClear')}
  />
)

WithCustomLabelProps.storyName = 'With custom label props'

export const WithError = () => <Input id="id" label="Label" validate={false} />

WithError.storyName = 'With error'

export const AsTextarea = () => <Input as="textarea" id="message" label="Message" rows="6" />

AsTextarea.storyName = 'As textarea'
