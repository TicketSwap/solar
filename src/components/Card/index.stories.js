import React from 'react'
import { Card } from './'
import styled from '@emotion/styled'
import { Avatar } from '../Avatar'
import { color } from '../../theme'

const Wrapper = story => <div style={{ maxWidth: 400 }}>{story()}</div>

export default {
  title: 'Card',
  decorators: [Wrapper],
}

export const Basic = () => (
  <a href="/">
    <Card title="Title" />
  </a>
)

export const WithText = () => (
  <a href="/">
    <Card title="Title" text="Lorem ipsum dolor sit amet." />
  </a>
)

WithText.story = {
  name: 'With text',
}

export const WithAdornments = () => (
  <a href="/">
    <Card
      title="Title"
      text="Lorem ipsum dolor sit amet"
      leftAdornment={
        <Avatar size={36} src="https://www.placecage.com/200/200" />
      }
    />
  </a>
)

WithAdornments.story = {
  name: 'With adornment',
}

export const WithImage = () => (
  <a href="/">
    <Card
      image="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
      title="Title"
    />
  </a>
)

WithImage.story = {
  name: 'With image',
}

export const Large = () => (
  <a href="/">
    <Card
      size="large"
      title="Title"
      subtitle="Subtitle"
      text="Lorem ipsum dolor sit amet"
      rightAdornment={
        <strong style={{ lineHeight: 1, display: 'block' }}>£25</strong>
      }
      verticalAlign="top"
    />
  </a>
)

const StyledCard = styled(Card)`
  background-color: ${color.skyLight};

  &:hover,
  &:focus {
    background-color: ${color.sky};
  }

  * {
    color: ${color.earth};
  }
`

export const Styled = () => (
  <a href="/">
    <StyledCard
      title="Show more"
      text="Events in your area"
      appearance="light"
    />
  </a>
)
