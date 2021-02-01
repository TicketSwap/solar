import React from 'react'
import { css } from '@emotion/react'
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

export enum CardVerticalAlign {
  top = 'top',
  center = 'center',
  bottom = 'bottom',
}

export enum CardSize {
  default = 'default',
  large = 'large',
}

export interface CardPropTypes {
  title?: string
  subtitle?: string
  text?: string
  description?: string | React.ReactNode
  image?: string
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
  topLeftAdornment?: React.ReactNode
  verticalAlign?: CardVerticalAlign
  size?: CardSize
}

export interface StyledCardProps extends CardPropTypes {
  hasImage?: boolean
}

const Container = styled.div<StyledCardProps>`
  position: relative;
  border-radius: ${radius.lg};
  padding: ${props =>
    props.size === CardSize.large
      ? !props.hasImage && space[16]
      : !props.hasImage && space[12]};
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
      p.size === CardSize.large
        ? !p.hasImage && space[24]
        : !p.hasImage && space[16]};
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

const Content = styled.div<StyledCardProps>`
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

const Body = styled.div<StyledCardProps>`
  flex-grow: 0;
  font-size: ${fontSize[20]};
  font-weight: ${fontWeight.regular};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${props =>
    props.verticalAlign === CardVerticalAlign.top
      ? 'flex-start'
      : props.verticalAlign === CardVerticalAlign.bottom
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
          rgba(0, 19, 25, 0.5)
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

const TextContent = styled.div<StyledCardProps>`
  color: ${color.space};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left;
  position: relative;
  overflow: hidden;
  word-break: break-all;

  ${props =>
    props.hasImage &&
    css`
      color: ${color.spaceMedium};
    `};
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
  @media ${device.mobile} {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const clamp = css`
  @media ${device.mobile} {
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

const Title = styled.h4<StyledCardProps>`
  ${props => (props.hasImage ? clamp : truncate)};
  font-size: ${p => (p.size === CardSize.large ? fontSize[18] : fontSize[16])};
  font-weight: ${fontWeight.semiBold};
  line-height: ${lineHeight.title};

  @media ${device.mobileL} {
    font-size: ${p =>
      p.size === CardSize.large ? fontSize[20] : fontSize[18]};
  }

  ${props =>
    props.hasImage &&
    css`
      color: ${color.nova};

      [data-theme='dark'] & {
        color: ${color.space};
      }
    `};
`

const Subtitle = styled.h5<StyledCardProps>`
  ${props => !props.hasImage && truncate};
  font-size: ${p => (p.size === CardSize.large ? fontSize[16] : fontSize[14])};
  font-weight: ${fontWeight.regular};
  color: ${color.spaceMedium};

  @media ${device.mobileL} {
    font-size: ${p =>
      p.size === CardSize.large ? fontSize[18] : fontSize[16]};
  }
`

const Text = styled.span<StyledCardProps>`
  ${props => !props.hasImage && truncate};
  display: block;
  font-size: ${p => (p.size === CardSize.large ? fontSize[14] : fontSize[12])};
  opacity: 0.6;

  @media ${device.mobileL} {
    font-size: ${p =>
      p.size === CardSize.large ? fontSize[16] : fontSize[14]};
  }

  ${props =>
    props.hasImage &&
    css`
      color: ${color.nova};

      [data-theme='dark'] & {
        color: ${color.space};
      }
    `};
`

const Description = styled.div<StyledCardProps>`
  display: flex;
  line-height: ${lineHeight.title};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  font-size: ${fontSize[14]};
  margin-top: 0.75rem;

  @media ${device.mobileL} {
    margin-top: 1rem;
    font-size: ${fontSize[16]};
  }
`

const Card: React.FC<CardPropTypes> = ({
  title,
  subtitle,
  text,
  description,
  image,
  leftAdornment,
  rightAdornment,
  topLeftAdornment,
  verticalAlign = CardVerticalAlign.center,
  size = CardSize.default,
  ...props
}) => {
  const hasImage = Boolean(image)

  return (
    <Container hasImage={hasImage} {...props}>
      {!!image && <Image src={image} alt={title ? title : 'Image'} rounded />}

      <Content hasImage={hasImage}>
        {hasImage && topLeftAdornment && (
          <TopLeftAdornment>{topLeftAdornment}</TopLeftAdornment>
        )}

        <Body hasImage={hasImage}>
          {leftAdornment && <LeftAdornment>{leftAdornment}</LeftAdornment>}

          <TextContent hasImage={hasImage}>
            {title && <Title hasImage={hasImage}>{title}</Title>}

            {subtitle && <Subtitle hasImage={hasImage}>{subtitle}</Subtitle>}

            {text && <Text hasImage={hasImage}>{text}</Text>}

            {description && (
              <Description hasImage={hasImage}>{description}</Description>
            )}
          </TextContent>

          {rightAdornment && <RightAdornment>{rightAdornment}</RightAdornment>}
        </Body>
      </Content>
    </Container>
  )
}

export { Card }
