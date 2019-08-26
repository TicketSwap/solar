import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import {
  color,
  space,
  fontSize,
  fontWeight,
  transition,
  lineHeight,
  device,
} from '../../theme'

const Container = styled.div`
  position: relative;
  z-index: 4;
  background-color: ${color.space};
  width: 100%;
  height: ${props => (props.height === 'full' ? '100vh' : 'auto')};
  color: white;
`

const BackgroundImage = styled.div`
  position: absolute;
  z-index: -2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  &::before {
    position: absolute;
    z-index: 2;
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: ${props =>
      props.tinted
        ? `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.25) 100%
          )`
        : `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.25) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0) 100%
          )`};
  }

  &::after {
    position: absolute;
    z-index: 1;
    content: '';
    left: ${props => (props.blurred ? '-32px' : 0)};
    top: ${props => (props.blurred ? '-32px' : 0)};
    right: ${props => (props.blurred ? '-32px' : 0)};
    bottom: ${props => (props.blurred ? '-32px' : 0)};
    filter: ${props => (props.blurred ? 'blur(16px)' : 'none')};
    background-size: cover;
    background-position: center;
    background-image: ${props =>
      props.imageUrl ? `url(${props.imageUrl})` : 'none'};

    ${props =>
      props.images &&
      props.images.mobileLandscape &&
      css`
        background-image: ${props.images.mobileLandscape
          ? `url(${props.images.mobileLandscape})`
          : props.imageUrl
          ? `url(${props.imageUrl})`
          : 'none'};
      `};

    ${props =>
      props.images &&
      props.images.mobilePortrait &&
      css`
        @media ${device.mobileM} and (orientation: portrait) {
          background-image: ${props.images.mobilePortrait
            ? `url(${props.images.mobilePortrait})`
            : props.imageUrl
            ? `url(${props.imageUrl})`
            : 'none'};
        }
      `};

    ${props =>
      props.images &&
      props.images.tablet &&
      css`
        @media ${device.tablet} and (orientation: portrait) {
          background-image: ${props.images.tablet
            ? `url(${props.images.tablet})`
            : props.imageUrl
            ? `url(${props.imageUrl})`
            : 'none'};
        }
      `};

    ${props =>
      props.images &&
      props.images.desktop &&
      css`
        @media ${device.tablet} {
          background-image: ${props.images.desktop
            ? `url(${props.images.desktop})`
            : props.imageUrl
            ? `url(${props.imageUrl})`
            : 'none'};
        }
      `};
  }
`

const Content = styled.div`
  text-align: center;
  padding-top: ${props => (props.height === 'full' ? '30vmin' : space[64])};
  padding-bottom: ${space[16]};
  padding-left: ${space[16]};
  padding-right: ${space[16]};

  @media ${device.mobileL} {
    padding-bottom: ${space[32]};
    padding-left: ${space[32]};
    padding-right: ${space[32]};
  }

  @media ${device.tablet} {
    padding-bottom: ${space[64]};
    padding-left: ${space[64]};
    padding-right: ${space[64]};
  }
`

const Caption = styled.span`
  position: absolute;
  text-align: right;
  line-height: ${lineHeight.solid};
  right: 0;
  bottom: 0;
  padding: ${space[8]};
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize[12]};
  text-transform: uppercase;
  letter-spacing: 0.0375rem;
  color: ${color.stardustLightAlpha};

  ${props =>
    props.as === 'a' &&
    css`
      transition: ${transition};

      &:hover,
      &:focus {
        opacity: 0.6;
      }
    `}

  @media ${device.tablet} {
    font-size: ${fontSize[12]};
  }
`

export const Cover = ({
  children,
  caption,
  captionUrl,
  imageUrl,
  images,
  blurred,
  tinted,
  ...props
}) => (
  <Container {...props}>
    <Content height={props.height}>{children}</Content>

    {caption && captionUrl ? (
      <Caption as="a" href={captionUrl} rel="noopener noreferrer">
        {caption}
      </Caption>
    ) : null}

    {caption && !captionUrl ? <Caption>{caption}</Caption> : null}

    <BackgroundImage
      imageUrl={imageUrl}
      images={images}
      blurred={blurred}
      tinted={tinted}
    />
  </Container>
)

Cover.propTypes = {
  imageUrl: PropTypes.string,
  images: PropTypes.shape({
    desktop: PropTypes.string,
    tablet: PropTypes.string,
    mobilePortrait: PropTypes.string,
    mobileLandscape: PropTypes.string,
  }),
  caption: PropTypes.string,
  captionUrl: PropTypes.string,
}
