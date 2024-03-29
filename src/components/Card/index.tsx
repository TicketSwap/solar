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
  header?: React.ReactNode
  description?: string | React.ReactNode
  image?: string
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
  topLeftAdornment?: React.ReactNode
  verticalAlign?: keyof typeof CardVerticalAlign
  size?: keyof typeof CardSize
  footer?: React.ReactNode
}

export interface StyledCardProps extends CardPropTypes {
  hasImage?: boolean
  hasSubtitle?: boolean
}

const Container = styled.div<StyledCardProps>`
  position: relative;
  border-radius: ${radius.lg};
  padding-block: ${props =>
    props.size === CardSize.large
      ? !props.hasImage && space[16]
      : !props.hasImage && space[12]};
  padding-inline: ${props =>
    props.size === CardSize.large
      ? !props.hasImage && space[16]
      : !props.hasImage && space[12]};
  background-color: ${color.elevatedBackground};

  @media ${device.mobileL} {
    padding-block: ${p =>
      p.size === CardSize.large
        ? !p.hasImage && space[24]
        : !p.hasImage && space[16]};
    padding-inline: ${p =>
      p.size === CardSize.large
        ? !p.hasImage && space[24]
        : !p.hasImage && space[16]};
  }

  @media ${device.tablet} {
    img {
      object-fit: cover;
      max-block-size: ${space[256]};
    }
  }

  &:hover,
  &:focus {
    background-color: ${color.actionBackground};
  }

  &:focus {
    box-shadow: 0 0 0 ${space[4]} ${color.actionFocus};
    outline: 0;
  }
`

const Content = styled.div<StyledCardProps>`
  position: ${props => (props.hasImage ? 'absolute' : 'relative')};
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
      padding-block: ${space[12]};
      padding-inline: ${space[12]};
      border-end-start-radius: ${radius.lg};
      border-end-end-radius: ${radius.lg};

      @media ${device.mobileL} {
        padding-block: ${space[16]};
        padding-inline: ${space[16]};
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
  padding-block: 0;
  padding-inline: 0;
  flex-grow: 0;
  margin-inline-end: ${space[12]};

  @media ${device.mobileL} {
    margin-inline-end: ${space[16]};
  }
`

const TextContent = styled.div<StyledCardProps>`
  color: ${color.foreground};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: start;
  position: relative;
  overflow: hidden;
  word-break: break-all;

  ${props =>
    props.hasImage &&
    css`
      color: ${color.lightForegroundMuted};
    `};
`

const RightAdornment = styled.footer`
  padding-block: 0;
  padding-inline: 0;
  flex-grow: 0;
  margin-inline-start: ${space[12]};

  @media ${device.mobileL} {
    margin-inline-start: ${space[16]};
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
  margin-block-end: auto;
  padding-block: ${space[12]};
  padding-inline: ${space[12]};

  @media ${device.mobileL} {
    padding-block: ${space[16]};
    padding-inline: ${space[16]};
  }
`

const Title = styled.h4<StyledCardProps>`
  ${props => (props.hasImage ? clamp : truncate)};
  font-size: ${p => (p.size === CardSize.large ? fontSize[18] : fontSize[16])};
  font-weight: ${fontWeight.semiBold};

  @media ${device.mobileL} {
    font-size: ${p =>
      p.size === CardSize.large ? fontSize[20] : fontSize[18]};
  }

  ${props =>
    props.hasImage &&
    css`
      color: ${color.lightForeground};
    `};
`

const Subtitle = styled.h5<StyledCardProps>`
  ${props => !props.hasImage && truncate};
  font-size: ${p => (p.size === CardSize.large ? fontSize[16] : fontSize[14])};
  font-weight: ${fontWeight.regular};
  color: ${color.foregroundMuted};

  @media ${device.mobileL} {
    font-size: ${p =>
      p.size === CardSize.large ? fontSize[18] : fontSize[16]};
  }
`

const Text = styled.span<StyledCardProps>`
  ${props => !props.hasImage && truncate};
  display: block;
  font-size: ${p => {
    if (p.hasSubtitle) {
      return p.size === CardSize.large ? fontSize[18] : fontSize[16]
    }

    return p.size === CardSize.large ? fontSize[14] : fontSize[12]
  }};
  opacity: 0.6;

  @media ${device.mobileL} {
    font-size: ${p => {
      if (p.hasSubtitle) {
        return p.size === CardSize.large ? fontSize[18] : fontSize[16]
      }

      return p.size === CardSize.large ? fontSize[16] : fontSize[14]
    }};
  }

  ${props =>
    props.hasImage &&
    css`
      color: ${color.lightForeground};
    `};
`

const Description = styled.div<StyledCardProps>`
  display: flex;
  line-height: ${lineHeight.title};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  inline-size: 100%;
  font-size: ${fontSize[14]};
  margin-block-start: 0.75rem;

  @media ${device.mobileL} {
    margin-block-start: 1rem;
    font-size: ${fontSize[16]};
  }
`

const Footer = styled.div`
  margin-block-start: ${space[24]};
`

const BackgroundImage = styled(Image)`
  &::after {
    content: '';
    position: absolute;
    block-size: 100%;
    inset-inline: 0;
    inset-block-end: 0;
    border-radius: ${radius.lg};
    background-image: linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.011) 7.5%,
      hsla(0, 0%, 0%, 0.041) 13.4%,
      hsla(0, 0%, 0%, 0.088) 18.1%,
      hsla(0, 0%, 0%, 0.149) 21.8%,
      hsla(0, 0%, 0%, 0.22) 25%,
      hsla(0, 0%, 0%, 0.299) 28%,
      hsla(0, 0%, 0%, 0.383) 31.1%,
      hsla(0, 0%, 0%, 0.467) 34.6%,
      hsla(0, 0%, 0%, 0.551) 38.9%,
      hsla(0, 0%, 0%, 0.63) 44.3%,
      hsla(0, 0%, 0%, 0.701) 51.2%,
      hsla(0, 0%, 0%, 0.762) 59.8%,
      hsla(0, 0%, 0%, 0.809) 70.6%,
      hsla(0, 0%, 0%, 0.839) 83.9%,
      hsla(0, 0%, 0%, 0.85) 100%
    );
  }
`

const Card: React.FC<CardPropTypes> = ({
  title,
  subtitle,
  text,
  description,
  image,
  header,
  leftAdornment,
  rightAdornment,
  topLeftAdornment,
  footer,
  verticalAlign = CardVerticalAlign.center,
  size = CardSize.default,
  ...props
}) => {
  const hasImage = Boolean(image)
  const hasSubtitle = Boolean(subtitle)

  return (
    <Container hasImage={hasImage} {...props}>
      {!!image && (
        <BackgroundImage src={image} alt={title ? title : 'Image'} rounded />
      )}

      <Content hasImage={hasImage}>
        {hasImage && topLeftAdornment && (
          <TopLeftAdornment>{topLeftAdornment}</TopLeftAdornment>
        )}

        <Body hasImage={hasImage} verticalAlign={verticalAlign}>
          {leftAdornment && <LeftAdornment>{leftAdornment}</LeftAdornment>}

          <TextContent hasImage={hasImage}>
            {header}

            {title && <Title hasImage={hasImage}>{title}</Title>}

            {hasSubtitle && <Subtitle hasImage={hasImage}>{subtitle}</Subtitle>}

            {text && (
              <Text hasSubtitle={hasSubtitle} hasImage={hasImage}>
                {text}
              </Text>
            )}

            {description && (
              <Description hasImage={hasImage}>{description}</Description>
            )}
          </TextContent>

          {rightAdornment && <RightAdornment>{rightAdornment}</RightAdornment>}
        </Body>

        {footer && <Footer>{footer}</Footer>}
      </Content>
    </Container>
  )
}

export { Card }
