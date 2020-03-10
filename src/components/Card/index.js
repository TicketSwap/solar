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
    p.size === 'large' ? !p.hasImage && space[16] : !p.hasImage && space[12]};
  background-color: ${color.stardust};

  ${props =>
    props.hasImage &&
    css`
      &::before {
        content: '';
        position: absolute;
        z-index: 2;
        height: 65%;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: ${radius.lg};
        background-image: linear-gradient(
          to top,
          hsla(0, 0%, 0%) 0%,
          hsla(0, 0%, 0%, 0.738) 19%,
          hsla(0, 0%, 0%, 0.541) 34%,
          hsla(0, 0%, 0%, 0.382) 47%,
          hsla(0, 0%, 0%, 0.278) 56.5%,
          hsla(0, 0%, 0%, 0.194) 65%,
          hsla(0, 0%, 0%, 0.126) 73%,
          hsla(0, 0%, 0%, 0.075) 80.2%,
          hsla(0, 0%, 0%, 0.042) 86.1%,
          hsla(0, 0%, 0%, 0.021) 91%,
          hsla(0, 0%, 0%, 0.008) 95.2%,
          hsla(0, 0%, 0%, 0.002) 98.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }
    `};

  @media ${device.mobileL} {
    padding: ${p =>
      p.size === 'large' ? !p.hasImage && space[24] : !p.hasImage && space[16]};
  }

  @media ${device.tablet} {
    img {
      object-fit: cover;
      max-height: ${space[256]};
    }
  }

  &:hover,
  &:focus {
    background-color: ${color.spaceLightest};
  }
`

const Content = styled.div`
  position: ${props => (props.hasImage ? 'absolute' : 'relative')};
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 4;
`

const Body = styled.div`
  flex-grow: 0;
  font-size: ${fontSize[20]};
  font-weight: ${fontWeight.regular};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${props =>
    props.verticalAlign === 'top'
      ? 'flex-start'
      : props.verticalAlign === 'bottom'
      ? 'flex-end'
      : 'center'};

  ${props =>
    props.hasImage &&
    css`
      padding: ${space[12]};
      border-bottom-left-radius: ${radius.lg};
      border-bottom-right-radius: ${radius.lg};
      z-index: 3;
      

      @media ${device.mobileL} {
        padding: ${space[16]};
      }

      ${Container}:hover &,
      ${Container}:focus & {
        background-image: linear-gradient(
          to bottom,
          rgba(0, 19, 25, 0.1),
          rgba(0, 19, 25, .5)
        );
      }
    `};
`

const LeftAdornment = styled.header`
  padding: 0;
  flex-grow: 0;
  margin-right: ${space[12]};

  @media ${device.mobileL} {
    margin-right: ${space[16]};
  }
`

const TextContent = styled.div`
  color: ${props => (props.theme === 'light' ? 'white' : color.space)};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left;
  position: relative;
  overflow: hidden;
`

const RightAdornment = styled.footer`
  padding: 0;
  flex-grow: 0;
  margin-left: ${space[12]};

  @media ${device.mobileL} {
    margin-left: ${space[16]};
  }
`

const truncate = css`
  @media ${device.mobileL} {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const clamp = css`
  @media ${device.mobileL} {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    /* Limit the text block to two lines */
    -webkit-line-clamp: 2;
  }
`

const TopLeftAdornment = styled.div`
  display: flex;
  margin-bottom: auto;
  padding: ${space[12]};

  @media ${device.mobileL} {
    padding: ${space[16]};
  }
`

const Title = styled.h4`
  ${props => (props.hasImage ? clamp : truncate)};
  font-size: ${p => (p.size === 'large' ? fontSize[18] : fontSize[16])};
  font-weight: ${fontWeight.semiBold};
  line-height: ${lineHeight.title};

  @media ${device.mobileL} {
    font-size: ${p => (p.size === 'large' ? fontSize[20] : fontSize[18])};
  }
`

const Subtitle = styled.h5`
  ${props => !props.hasImage && truncate};
  font-size: ${p => (p.size === 'large' ? fontSize[16] : fontSize[14])};
  font-weight: ${fontWeight.regular};

  @media ${device.mobileL} {
    font-size: ${p => (p.size === 'large' ? fontSize[18] : fontSize[16])};
  }
`

const Text = styled.span`
  ${props => !props.hasImage && truncate};
  display: block;
  font-size: ${p => (p.size === 'large' ? fontSize[14] : fontSize[12])};
  opacity: 0.6;

  @media ${device.mobileL} {
    font-size: ${p => (p.size === 'large' ? fontSize[16] : fontSize[14])};
  }
`

const Description = styled.div`
  display: block;
  line-height: ${lineHeight.title};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  font-size: ${p => (p.size === 'large' ? fontSize[14] : fontSize[12])};
  margin-top: 0.75rem;

  @media ${device.mobileL} {
    margin-top: 1rem;
    font-size: ${p => (p.size === 'large' ? fontSize[16] : fontSize[14])};
  }
`

export function Card({
  title,
  subtitle,
  text,
  description,
  image,
  header,
  leftAdornment,
  rightAdornment,
  topLeftAdornment,
  verticalAlign,
  size,
  ...props
}) {
  const hasImage = Boolean(image)
  const theme = hasImage ? 'light' : props.appearance

  return (
    <Container hasImage={hasImage} size={size} {...props}>
      {hasImage && <Image src={image} alt={title} rounded />}

      <Content hasImage={hasImage}>
        {hasImage && topLeftAdornment && (
          <TopLeftAdornment>{topLeftAdornment}</TopLeftAdornment>
        )}

        <Body hasImage={hasImage} verticalAlign={verticalAlign}>
          {leftAdornment && <LeftAdornment>{leftAdornment}</LeftAdornment>}

          <TextContent theme={theme}>
            {title && (
              <Title size={size} hasImage={hasImage}>
                {title}
              </Title>
            )}

            {subtitle && (
              <Subtitle size={size} hasImage={hasImage}>
                {subtitle}
              </Subtitle>
            )}

            {text && (
              <Text size={size} theme={theme} hasImage={hasImage}>
                {text}
              </Text>
            )}

            {description && (
              <Description size={size}>{description}</Description>
            )}
          </TextContent>

          {rightAdornment && <RightAdornment>{rightAdornment}</RightAdornment>}
        </Body>
      </Content>
    </Container>
  )
}

Card.defaultProps = {
  appearance: 'dark',
  size: 'default',
  verticalAlign: 'center',
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  image: PropTypes.string,
  leftAdornment: PropTypes.element,
  rightAdornment: PropTypes.element,
  topLeftAdornment: PropTypes.element,
  verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
  appearance: PropTypes.oneOf(['dark', 'light']),
  size: PropTypes.oneOf(['default', 'large']),
}
