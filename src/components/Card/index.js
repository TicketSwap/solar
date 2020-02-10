import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
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

const Container = styled.div`
  position: relative;
  border-radius: ${radius.lg};
  padding: ${p =>
    p.size === 'large' ? p.pad && space[16] : p.pad && space[12]};
  background-color: ${color.stardust};
  backface-visibility: hidden;

  @media ${device.mobileL} {
    padding: ${p =>
      p.size === 'large' ? p.pad && space[24] : p.pad && space[16]};
  }

  &:hover,
  &:focus {
    background-color: ${color.spaceLightest};
  }
`

const Content = styled.div`
  font-size: ${fontSize[20]};
  font-weight: ${fontWeight.regular};
  display: flex;
  flex-direction: row;
  align-items: ${props => props.alignItems};
  justify-content: space-between;

  ${props =>
    props.floating &&
    css`
      padding: ${space[12]};
      background-image: linear-gradient(
        to bottom,
        rgba(0, 19, 25, 0),
        rgba(0, 19, 25, 0.8)
      );
      backdrop-filter: blur(0.5rem);
      border-bottom-left-radius: ${radius.lg};
      border-bottom-right-radius: ${radius.lg};
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      right: 0;

      @media ${device.mobileL} {
        padding: ${space[16]};
      }

      ${Container}:hover &,
      ${Container}:focus & {
        background-image: linear-gradient(
          to bottom,
          rgba(0, 19, 25, 0.25),
          rgba(0, 19, 25, 1)
        );
      }
    `};
`

const Header = styled.header`
  padding: 0;
  flex-grow: 0;
  margin-right: ${space[12]};

  @media ${device.mobileL} {
    margin-right: ${space[16]};
  }
`

const Body = styled.div`
  color: ${props => (props.theme === 'light' ? 'white' : color.space)};
  flex-grow: 1;
  text-align: left;
  position: relative;
  overflow: hidden;
`

const Footer = styled.footer`
  padding: 0;
  flex-grow: 0;
  margin-left: ${space[12]};

  @media ${device.mobileL} {
    margin-left: ${space[16]};
  }
`

const textStyles = css`
  display: block;
  line-height: ${lineHeight.title};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${device.mobileL} {
    line-height: ${lineHeight.solid};
  }
`

const Title = styled.h4`
  ${textStyles};
  font-size: ${p => (p.size === 'large' ? fontSize[18] : fontSize[16])};
  font-weight: ${fontWeight.semiBold};

  @media ${device.mobileL} {
    font-size: ${p => (p.size === 'large' ? fontSize[20] : fontSize[18])};
  }
`

const Subtitle = styled.h5`
  ${textStyles};
  font-size: ${p => (p.size === 'large' ? fontSize[16] : fontSize[14])};
  font-weight: ${fontWeight.regular};

  @media ${device.mobileL} {
    margin-top: 0.375rem;
    font-size: ${p => (p.size === 'large' ? fontSize[18] : fontSize[16])};
  }
`

const Text = styled.span`
  ${textStyles};
  font-size: ${p => (p.size === 'large' ? fontSize[14] : fontSize[12])};
  opacity: 0.6;
  margin-top: 0.125rem;

  @media ${device.mobileL} {
    margin-top: 0.375rem;
    font-size: ${p => (p.size === 'large' ? fontSize[16] : fontSize[14])};
  }
`

export function Card({
  title,
  subtitle,
  text,
  image,
  leftAdornment,
  rightAdornment,
  size,
  ...props
}) {
  const hasImage = Boolean(image)
  const theme = hasImage ? 'light' : props.appearance

  return (
    <Container pad={!hasImage} size={size} {...props}>
      {hasImage && <Image src={image} alt={title} rounded />}
      <Content floating={hasImage} alignItems={props.verticalAlign}>
        {leftAdornment && <Header>{leftAdornment}</Header>}
        <Body theme={theme}>
          {title && <Title size={size}>{title}</Title>}
          {subtitle && <Subtitle size={size}>{subtitle}</Subtitle>}
          {text && (
            <Text size={size} theme={theme}>
              {text}
            </Text>
          )}
        </Body>
        {rightAdornment && <Footer>{rightAdornment}</Footer>}
      </Content>
    </Container>
  )
}

Card.defaultProps = {
  verticalAlign: 'center',
  appearance: 'dark',
  size: 'default',
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  leftAdornment: PropTypes.element,
  rightAdornment: PropTypes.element,
  verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
  appearance: PropTypes.oneOf(['dark', 'light']),
  size: PropTypes.oneOf(['default', 'large']),
}
