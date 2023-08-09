import React, { ReactElement } from 'react'
import styled from '@emotion/styled'
import {
  color,
  device,
  space,
  fontSize,
  fontWeight,
  lineHeight,
} from '../../theme'
import { H1, H2 } from '../Heading'
import { css } from '@emotion/react'

interface CoverContainerProps {
  fullHeight: boolean
}

const CoverContainer = styled.div<CoverContainerProps>`
  position: relative;
  inline-size: 100%;
  block-size: auto;
  overflow: hidden;
  background-color: var(--_coverBackgroundColor, ${color.darkBackground});

  @media (prefers-color-scheme: dark) {
    border-top: 1px solid ${color.strokeStrong};
    border-bottom: 1px solid ${color.strokeStrong};
  }

  ${props =>
    props.fullHeight &&
    css`
      min-block-size: 100vh;
      display: flex;
      align-items: flex-end;
    `}
`

export interface CoverImages {
  desktop?: string
  tablet?: string
  mobilePortrait?: string
  mobileLandscape?: string
}

interface CoverBackgroundImageProps {
  images?: CoverImages
  fullHeight: boolean
  defaultImage?: string
}

const CoverBackgroundImage = styled.div<CoverBackgroundImageProps>`
  position: absolute;
  inset-inline: 0;
  inset-block-start: 0;
  block-size: 100%;
  background-size: cover;
  background-position: center;
  filter: ${props => (props.fullHeight ? 'none' : 'blur(32px)')};
  transform: scale(1.2);

  ${props =>
    props.defaultImage &&
    css`
      background-image: url(${props.defaultImage});
    `};

  ${props =>
    props.images &&
    props.images.mobileLandscape &&
    css`
      background-image: url(${props.images.mobileLandscape});
    `};

  ${props =>
    props.images &&
    props.images.mobilePortrait &&
    css`
      @media ${device.mobileM} and (orientation: portrait) {
        background-image: url(${props.images.mobilePortrait});
      }
    `};

  ${props =>
    props.images &&
    props.images.tablet &&
    css`
      @media ${device.tablet} and (orientation: portrait) {
        background-image: url(${props.images.tablet});
      }
    `};

  ${props =>
    props.images &&
    props.images.desktop &&
    css`
      @media ${device.tablet} {
        background-image: url(${props.images.desktop});
      }
    `};

  ${({ defaultImage }) =>
    defaultImage &&
    css`
      &:after {
        content: '';
        position: absolute;
        block-size: 100%;
        inline-size: 100%;
        inset-inline: 0;
        inset-block-start: 0;
        background: linear-gradient(
          180deg,
          rgba(26, 33, 41, 0.4) 0%,
          rgba(26, 33, 41, 0.8) 100%
        );
      }
    `}
`

const CoverContent = styled.div`
  position: relative;
  margin-block: 0;
  margin-inline: auto;
  padding-inline-start: ${space[16]};
  padding-inline-end: ${space[16]};
  padding-block: ${space[48]};
  max-inline-size: 960px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media ${device.laptopM} {
    max-inline-size: 1128px;
  }

  @media ${device.tablet} {
    padding-block: ${space[64]};
    padding-inline-start: ${space[32]};
    padding-inline-end: ${space[32]};
  }
`

const Titles = styled.div`
  + * {
    margin-block-start: ${space[16]};
  }

  @media ${device.tablet} {
    + * {
      margin-block-start: ${space[24]};
    }
  }
`

const Title = styled(H1)`
  color: var(--_coverTitleColor, ${color.lightForeground});
  text-wrap: balance;
`

const Subtitle = styled(H2)`
  color: var(--_coverSubtitleColor, ${color.lightForegroundMuted});
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize[20]};
  line-height: ${lineHeight.title};
  text-wrap: balance;

  @media ${device.tablet} {
    font-size: ${fontSize[24]};
  }
`

const Graphic = styled.div`
  margin-block-end: ${space[16]};

  @media ${device.tablet} {
    margin-block-end: ${space[32]};
  }
`

const Tag = styled.div`
  margin-block-end: ${space[8]};
`

const MetaInfo = styled.div`
  max-width: 100%;

  + * {
    margin-block-start: ${space[16]};
  }

  @media ${device.tablet} {
    + * {
      margin-block-start: ${space[32]};
    }
  }
`

interface CoverProps {
  title: string
  subtitle?: string | ReactElement
  images?: CoverImages
  tag?: ReactElement
  graphic?: ReactElement
  metaInfo?: ReactElement
  actions?: ReactElement
  fullHeight?: boolean
}

export const Cover = ({
  images,
  tag,
  title,
  subtitle,
  graphic,
  metaInfo,
  actions,
  fullHeight = false,
  ...props
}: CoverProps) => {
  const defaultImage =
    images?.desktop ||
    images?.tablet ||
    images?.mobilePortrait ||
    images?.mobileLandscape

  return (
    <CoverContainer {...props} fullHeight={fullHeight}>
      <CoverBackgroundImage
        defaultImage={defaultImage}
        images={images}
        fullHeight={fullHeight}
      />

      <CoverContent>
        {graphic && <Graphic>{graphic}</Graphic>}

        {tag && <Tag>{tag}</Tag>}

        <Titles>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Titles>

        {metaInfo && <MetaInfo>{metaInfo}</MetaInfo>}

        {actions && actions}
      </CoverContent>
    </CoverContainer>
  )
}
