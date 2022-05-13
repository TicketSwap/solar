import React from 'react'
import styled from '@emotion/styled'
import { Card, CardVerticalAlign, CardSize } from '.'
import { Avatar } from '../Avatar'
import { Pill } from '../Pill'
import { Ticket } from '../../icons'
import { color, space, device, fontSize, lineHeight, radius } from '../../theme'
import { Flag } from '../Flag'

const Container = styled.div`
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
`

const Grid = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${space[8]};

  @media ${device.tablet} {
    grid-gap: ${space[16]};
    grid-auto-flow: column;
  }
`

const Wrapper = (story: () => React.ReactNode) => <Container>{story()}</Container>

export default {
  title: 'Components/Surfaces/Card',
  decorators: [Wrapper],
}

export const Basic = () => (
  <Grid>
    <a href="/" style={{ minWidth: 0 }}>
      <Card title="Title" />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card title="Title" />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card title="Title" />
    </a>
  </Grid>
)

const Adornment = styled.div`
  display: block;
  border-radius: ${radius.sm};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: ${color.background};
  text-align: center;
  width: 40px;
  height: 40px;
`

export const WithAdornment = () => (
  <Grid>
    <a href="/" style={{ minWidth: 0 }}>
      <Card title="Title" leftAdornment={<Adornment />} />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card title="Title" leftAdornment={<Adornment />} />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card title="Title" leftAdornment={<Adornment />} />
    </a>
  </Grid>
)

WithAdornment.storyName = 'With adornment'

export const WithText = () => (
  <Grid>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - 1st Semi Final Jury Show"
        text="Lorem ipsum dolor sit amet."
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - 1st Semi Final Family Show"
        text="Lorem ipsum dolor sit amet."
        leftAdornment={<Avatar size={44} src="https://www.placecage.com/200/200" />}
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - Grand Final Live Show"
        text="Lorem ipsum dolor sit amet."
        leftAdornment={<Avatar size={44} src="https://www.placecage.com/200/200" />}
        rightAdornment={<Pill leftAdornment={<Ticket size={16} />}>25</Pill>}
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
  </Grid>
)

WithText.storyName = 'With text'

export const WithTextAndSubtitle = () => (
  <Grid>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - 1st Semi Final Jury Show"
        subtitle="I'm a subtitle"
        text="Lorem ipsum dolor sit amet."
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - 1st Semi Final Family Show"
        subtitle="I'm a subtitle"
        text="Lorem ipsum dolor sit amet."
        leftAdornment={<Avatar size={44} src="https://www.placecage.com/200/200" />}
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - Grand Final Live Show"
        subtitle="I'm a subtitle"
        text="Lorem ipsum dolor sit amet."
        leftAdornment={<Avatar size={44} src="https://www.placecage.com/200/200" />}
        rightAdornment={<Pill leftAdornment={<Ticket size={16} />}>25</Pill>}
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
  </Grid>
)

WithText.storyName = 'With text and subtitle'

export const WithImage = () => (
  <Grid>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - 1st Semi Final Jury Show"
        text="May 11, 2020"
        image="https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
        leftAdornment={<Avatar size={44} src="https://www.placecage.com/200/200" />}
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - 1st Semi Final Family Show"
        text="May 12, 2020"
        image="https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
        leftAdornment={<Avatar size={44} src="https://www.placecage.com/200/200" />}
        rightAdornment={<Pill leftAdornment={<Ticket size={16} />}>25</Pill>}
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
    <a href="/" style={{ minWidth: 0 }}>
      <Card
        title="Eurovision Song Contest - 1st Semi Final International Show"
        text="May 13, 2020"
        image="https://assets.imgix.net/unsplash/moon.jpg?fit=crop&crop=entropy&w=1678&h=1259&ixlib=imgixjs-3.4.1"
        leftAdornment={<Avatar size={44} src="https://www.placecage.com/200/200" />}
        rightAdornment={<Pill leftAdornment={<Ticket size={16} />}>25</Pill>}
        topLeftAdornment={<Flag countryCode="nl" />}
        verticalAlign={CardVerticalAlign.top}
      />
    </a>
  </Grid>
)

WithImage.storyName = 'With image'

const RightAdornment = styled.h4`
  font-size: ${fontSize[18]};
  line-height: ${lineHeight.title};

  @media ${device.mobileL} {
    font-size: ${fontSize[20]};
  }
`

export const Large = () => (
  <a href="/" style={{ minWidth: 0 }}>
    <Card
      size={CardSize.large}
      title="Title"
      subtitle="Subtitle"
      text="Lorem ipsum dolor sit amet"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      rightAdornment={<RightAdornment>£25</RightAdornment>}
      verticalAlign={CardVerticalAlign.top}
    />
  </a>
)

const StyledCard = styled(Card)`
  background-color: ${color.actionBackground};

  &:hover,
  &:focus {
    background-color: ${color.actionBackground};
    opacity: 0.8;
  }

  * {
    color: ${color.action};
  }
`

export const Styled = () => (
  <a href="/" style={{ minWidth: 0 }}>
    <StyledCard title="Show more" text="Events in your area" />
  </a>
)
