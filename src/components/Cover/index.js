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
  z-index: 2;
  background-color: ${color.space};
  width: 100%;
  height: ${props => (props.height === 'full' ? '100vh' : 'auto')};
  color: white;
`

const Background = styled.div`
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
`

const Image = styled.img`
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
  left: ${props => (props.blurred ? '-32px' : 0)};
  top: ${props => (props.blurred ? '-32px' : 0)};
  right: ${props => (props.blurred ? '-32px' : 0)};
  bottom: ${props => (props.blurred ? '-32px' : 0)};
  filter: ${props => (props.blurred ? 'blur(16px)' : 'none')};
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

    <Background tinted={tinted}>
      <picture>
        {images && (
          <>
            {images.desktop && (
              <source srcset={images.desktop} media={device.tablet} />
            )}
            {images.tablet && (
              <source
                srcset={images.tablet}
                media={`${device.tablet} and (orientation: portrait)`}
              />
            )}
            {images.mobilePortrait && (
              <source
                srcset={images.mobilePortrait}
                media={`${device.mobileM} and (orientation: portrait)`}
              />
            )}
          </>
        )}
        <Image
          src={(images && images.mobileLandscape) || imageUrl}
          alt="TicketSwap cover background"
          loading="lazy"
          blurred={blurred}
        />
      </picture>
    </Background>
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
