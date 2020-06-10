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
  device,
} from '../../theme'

const Container = styled.div`
  position: relative;
  z-index: 4;
  background-color: ${color.space};
  width: 100%;
  height: ${props => (props.fullHeight ? '100vh' : 'auto')};
  color: white;
  padding: ${space[16]};

  ${props =>
    props.blurred &&
    css`
      overflow: hidden;
    `}
`

const BackgroundImage = styled.div`
  position: absolute;
  z-index: -2;
  left: 0;
  top: 0;
  right: 0;
  height: 65%;
  background-size: cover;
  background-position: center;

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
    left: 0;
    right: 0;
  }

  &::before {
    top: 0;
    height: 40%;
    opacity: 0.4;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 19, 25, 1) 0%,
      rgba(0, 19, 25, 0.738) 19%,
      rgba(0, 19, 25, 0.541) 34%,
      rgba(0, 19, 25, 0.382) 47%,
      rgba(0, 19, 25, 0.278) 56.5%,
      rgba(0, 19, 25, 0.194) 65%,
      rgba(0, 19, 25, 0.126) 73%,
      rgba(0, 19, 25, 0.075) 80.2%,
      rgba(0, 19, 25, 0.042) 86.1%,
      rgba(0, 19, 25, 0.021) 91%,
      rgba(0, 19, 25, 0.008) 95.2%,
      rgba(0, 19, 25, 0.002) 98.2%,
      rgba(0, 19, 25, 0) 100%
    );
  }

  &::after {
    bottom: 0;
    height: 75%;
    background-image: linear-gradient(
      to top,
      rgba(0, 19, 25, 1) 0%,
      rgba(0, 19, 25, 0.738) 19%,
      rgba(0, 19, 25, 0.541) 34%,
      rgba(0, 19, 25, 0.382) 47%,
      rgba(0, 19, 25, 0.278) 56.5%,
      rgba(0, 19, 25, 0.194) 65%,
      rgba(0, 19, 25, 0.126) 73%,
      rgba(0, 19, 25, 0.075) 80.2%,
      rgba(0, 19, 25, 0.042) 86.1%,
      rgba(0, 19, 25, 0.021) 91%,
      rgba(0, 19, 25, 0.008) 95.2%,
      rgba(0, 19, 25, 0.002) 98.2%,
      rgba(0, 19, 25, 0) 100%
    );
  }
`

const Content = styled.div`
  padding-top: ${props => (props.blurred ? `${space[64]}` : `${space[128]}`)};
  padding-bottom: ${space[16]};

  @media ${device.tablet} {
    padding-top: ${144 / 16}rem;
  }
`

const CaptionContainer = styled.div`
  display: flex;
  white-space: nowrap;
  justify-content: center;
  position: absolute;
  right: ${space[4]};
  top: 33%;
  height: ${space[16]};

  @media ${device.tablet} {
    top: 50%;
  }
`

const Caption = styled.span`
  position: relative;
  transform: rotate(90deg) translateX(50%);
  transform-origin: right;
  font-weight: ${fontWeight.semiBold};
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.0375rem;
  color: ${color.stardustLightAlpha};
  margin-right: 0.5rem;

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
  fullHeight,
  ...props
}) => (
  <Container fullHeight={fullHeight} blurred={blurred} {...props}>
    <Content blurred={blurred}>{children}</Content>

    {caption && captionUrl && (
      <CaptionContainer>
        <Caption as="a" href={captionUrl} rel="noopener noreferrer">
          {caption}
        </Caption>
      </CaptionContainer>
    )}

    {caption && !captionUrl && <Caption>{caption}</Caption>}

    {(imageUrl || images) && (
      <BackgroundImage imageUrl={imageUrl} images={images} blurred={blurred} />
    )}
  </Container>
)

Cover.defaultProps = {
  blurred: false,
  fullHeight: false,
}

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
  blurred: PropTypes.bool,
  fullHeight: PropTypes.bool,
}
