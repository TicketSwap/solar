import React from 'react'
import styled from '@emotion/styled'
import { Image } from '../Image'
import {
  color,
  radius,
  space,
  fontSize,
  fontWeight,
  device,
  lineHeight,
} from '../../theme'
import { SmallText } from '../Text'
import { transition } from '../..'

const Container = styled.div`
  background-color: ${color.elevatedBackground};
  cursor: pointer;
  border-radius: ${radius.lg};
  display: grid;
  grid-template-columns: unset;
  grid-template-rows: 2fr 1;
  overflow: hidden;

  @media ${device.tablet} {
    aspect-ratio: 2.6 / 0.9;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: unset;
  }

  @media ${device.laptop} {
    &:hover {
      img {
        transition: all ${transition};
        transform: scale(1.1);
      }
    }

    &:not(:hover) {
      img {
        transition: all ${transition};
        transform: scale(1);
      }
    }
  }
`
const ImageHolder = styled.div`
  overflow: hidden;
  border-start-start-radius: ${radius.lg};
  border-start-end-radius: ${radius.lg};

  @media ${device.tablet} {
    border-start-end-radius: 0;
    border-end-start-radius: ${radius.lg};
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: ${space[16]};

  @media ${device.tablet} {
    padding-inline: ${space[24]};
    padding-block: ${space[40]};
  }
`
const Title = styled.h4`
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize[16]};
  line-height: ${lineHeight.copy};
  padding-block-end: ${space[4]};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
    padding-block-end: ${space[12]};
  }
`
const Body = styled(SmallText)`
  color: ${color.foregroundMuted};
  overflow: hidden;
`

interface Props {
  imageUrl: string
  imageAlt: string
  title: string
  text?: string
}

export const ImageCard = ({ imageUrl, imageAlt, title, text }: Props) => {
  return (
    <Container>
      <ImageHolder>
        <Image src={imageUrl} alt={imageAlt} />
      </ImageHolder>

      <Content>
        <Title>{title}</Title>
        {text && <Body>{text}</Body>}
      </Content>
    </Container>
  )
}
