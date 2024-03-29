import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  color,
  space,
  fontSize,
  fontWeight,
  transition,
  device,
  linearGradients,
} from '../../theme'

export interface CoverImagesPropType {
  desktop?: string
  tablet?: string
  mobilePortrait?: string
  mobileLandscape?: string
}

export interface CoverProps {
  imageUrl?: string
  images?: CoverImagesPropType
  caption?: string
  captionUrl?: string
  blurred?: boolean
  fullHeight?: boolean
  withInsetShadow?: boolean
  children?: ReactNode
}

const Container = styled.div<CoverProps>`
  position: relative;
  inline-size: 100%;
  block-size: ${props => (props.fullHeight ? '100vh' : 'auto')};

  ${props =>
    props.withInsetShadow &&
    css`
      background-color: ${color.darkElevatedBackground};

      @media (prefers-color-scheme: dark) {
        background-color: ${color.darkBackground};
      }
    `}

  ${props =>
    props.blurred &&
    css`
      overflow: hidden;
    `}
`

const BackgroundImage = styled.div<CoverProps>`
  position: absolute;
  inset-inline: 0;
  inset-block-start: 0;
  block-size: 100%;
  background-size: cover;
  background-position: center;

  ${props =>
    props.withInsetShadow &&
    css`
      block-size: 75%;
    `}

  ${props =>
    props.blurred &&
    css`
      filter: blur(15px);
      transform: scale(1.2);
    `}

  background-image: ${props =>
    props.imageUrl ? `url(${props.imageUrl})` : `none`};

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

  &::before,
  &::after {
    position: absolute;
    content: '';
    inset-inline: 0;
  }

  &::before {
    inset-block-start: 0;
    block-size: 40%;
    opacity: 0.4;
    background-image: linear-gradient(to bottom, ${linearGradients.cover});
  }

  &::after {
    inset-block-end: 0;
    block-size: 75%;
    background-image: linear-gradient(to top, ${linearGradients.dark});

    ${props =>
      props.withInsetShadow &&
      css`
        background-image: linear-gradient(to top, ${linearGradients.cover});
      `};
  }
`

const Content = styled.section<CoverProps>`
  position: relative;
  padding-block-start: ${props =>
    props.blurred ? `${space[64]}` : `${space[128]}`};
  padding-block-end: ${space[24]};

  @media ${device.tablet} {
    padding-block-start: ${space[144]};
    padding-block-end: ${space[48]};
  }
`

const CaptionContainer = styled.div`
  display: flex;
  white-space: nowrap;
  justify-content: center;
  position: absolute;
  inset-inline-end: ${space[4]};
  inset-block-start: 33%;
  block-size: ${space[16]};

  @media ${device.tablet} {
    inset-block-start: 50%;
  }
`

interface CaptionProps extends CoverProps {
  as?: string
  href?: string
  rel?: string
}

const Caption = styled.span<CaptionProps>`
  position: relative;
  transform: rotate(90deg) translateX(50%);
  transform-origin: right;
  font-weight: ${fontWeight.semiBold};
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.0375rem;
  color: ${color.foregroundSubtle};
  margin-inline-end: 0.5rem;

  ${props =>
    props.as === 'a' &&
    css`
      transition: ${transition};

      &:hover,
      &:focus {
        color: ${color.foregroundMuted};
      }
    `}

  @media ${device.tablet} {
    font-size: ${fontSize[12]};
  }
`

export const Cover: React.FC<CoverProps> = ({
  children,
  caption,
  captionUrl,
  imageUrl,
  images,
  blurred = false,
  fullHeight = false,
  withInsetShadow = true,
  ...props
}) => {
  const hasImages = imageUrl || images

  return (
    <Container
      fullHeight={fullHeight}
      blurred={blurred}
      withInsetShadow={withInsetShadow}
      {...props}
    >
      {hasImages && (
        <BackgroundImage
          imageUrl={imageUrl}
          images={images}
          blurred={blurred}
          withInsetShadow={withInsetShadow}
        />
      )}

      {caption && captionUrl && (
        <CaptionContainer>
          <Caption as="a" href={captionUrl} rel="noopener noreferrer">
            {caption}
          </Caption>
        </CaptionContainer>
      )}

      {caption && !captionUrl && <Caption>{caption}</Caption>}

      <Content blurred={blurred}>{children}</Content>
    </Container>
  )
}
