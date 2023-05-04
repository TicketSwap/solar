import React from 'react'
import { Cover } from '.'
import styled from '@emotion/styled'
import { color, device, radius, space } from '../../theme'
import {
  Calendar,
  ChevronRightAlt,
  Clock,
  MusicalNote,
  PlusAlt,
  Tag,
} from '../../icons'
import { Button } from '../Button'
import { StylisedIcon } from '../StylisedIcon'

const Graphic = styled.div`
  block-size: ${space[64]};
  inline-size: ${space[64]};
  background-color: ${color.lightBackground};
  opacity: 0.12;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.tablet} {
    block-size: ${space[96]};
    inline-size: ${space[96]};
  }
`

const Image = styled.img`
  aspect-ratio: 16 / 9;
  border-radius: ${radius.lg};
  width: 100%;
  max-inline-size: 375px;
  object-fit: cover;
`

const StyledCover = styled(Cover)`
  --_coverTitleColor: ${color.darkForeground};
  --_coverSubtitleColor: ${color.darkForeground};
  --_coverBackgroundColor: ${color.earth};
`

const Actions = styled.div`
  display: flex;
`

const List = styled.ul`
  display: flex;
  gap: ${space[16]};

  @media ${device.tablet} {
    gap: ${space[24]};
  }

  li {
    a,
    p {
      color: ${color.lightForegroundMuted};
    }
  }
`

export const basic = () => (
  <Cover
    title="Pop"
    subtitle="Discover our pop content"
    images={{
      desktop:
        'https://cdn.ticketswap.com/public/202210/07bd30f6-0cea-4f06-9cb4-fd2e9eff4f2a.jpg',
    }}
  />
)

export const withIconGraphic = () => (
  <Cover
    title="Pop"
    subtitle="Discover our pop content"
    images={{
      desktop:
        'https://cdn.ticketswap.com/public/202210/07bd30f6-0cea-4f06-9cb4-fd2e9eff4f2a.jpg',
    }}
    graphic={
      <Graphic>
        <Tag size={40} />
      </Graphic>
    }
  />
)

export const withImageGraphic = () => (
  <Cover
    title="Pop"
    subtitle="Discover our pop content"
    images={{
      desktop:
        'https://cdn.ticketswap.com/public/202211/zwarte-cross-2023-zwarte-cross-20-july-2023-1667298561.image.jpeg',
    }}
    graphic={
      <Image
        src="https://cdn.ticketswap.com/public/202211/zwarte-cross-2023-zwarte-cross-20-july-2023-1667298561.image.jpeg"
        alt="Pop image"
      />
    }
  />
)

export const withMetaInfo = () => (
  <Cover
    title="Pop"
    subtitle="Discover our pop content"
    images={{
      desktop:
        'https://cdn.ticketswap.com/public/202210/07bd30f6-0cea-4f06-9cb4-fd2e9eff4f2a.jpg',
    }}
    metaInfo={
      <List>
        <li>
          <p>
            <PlusAlt size={16} />
            100 artists
          </p>
        </li>
        <li>
          <a href="/Pop">
            Pop genre <ChevronRightAlt size={16} />
          </a>
        </li>
      </List>
    }
    graphic={<StylisedIcon icon={<Tag />} />}
  />
)

export const withActions = () => (
  <Cover
    title="Adele"
    subtitle="100 followers"
    images={{
      desktop:
        'https://cdn.ticketswap.com/public/202210/07bd30f6-0cea-4f06-9cb4-fd2e9eff4f2a.jpg',
    }}
    metaInfo={
      <List>
        <li>
          <p>
            <PlusAlt size={16} />
            100 artists
          </p>
        </li>
        <li>
          <a href="/Pop">
            Pop genre <ChevronRightAlt size={16} />
          </a>
        </li>
      </List>
    }
    actions={
      <Actions>
        <Button size="small">Follow me</Button>,
        <Button size="small" variant="secondary">
          Follow me
        </Button>
      </Actions>
    }
    graphic={<StylisedIcon icon={<MusicalNote />} />}
  />
)

export const withFullHeight = () => (
  <Cover
    title="How to make a cover"
    subtitle="A blog post about making a cover"
    fullHeight
    images={{
      desktop:
        'https://cdn.ticketswap.com/public/202210/07bd30f6-0cea-4f06-9cb4-fd2e9eff4f2a.jpg',
    }}
    metaInfo={
      <List>
        <li>
          <p>
            <Clock size={16} /> 1 minute read
          </p>
        </li>
        <li>
          <p>
            <Calendar size={16} /> 28/11
          </p>
        </li>
      </List>
    }
  />
)

export const withOtherColors = () => (
  <StyledCover
    title="Pop"
    subtitle="Discover our pop content"
    graphic={<StylisedIcon icon={<Tag />} />}
  />
)

export const withoutBackground = () => (
  <Cover title="Awakenings Festival 2026" />
)

const story = {
  title: 'Components/Content/CoverV2',
}

export default story
