import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Image } from '../Image'
import { color } from '../../theme'

export interface WrapperProps {
  size: number
}

const Wrapper = styled.div<WrapperProps>`
  vertical-align: middle;
  display: inline-block;
  flex: ${props => `${props.size}px`};
  inline-size: ${props => `${props.size}px`};
  block-size: ${props => `${props.size}px`};
  min-inline-size: ${props => `${props.size}px`};
  min-block-size: ${props => `${props.size}px`};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
`

const imageStyles = css`
  position: absolute;
  inset: 0;
  block-size: 100%;
  inline-size: 100%;
  border-radius: 50%;
`

const StyledImage = styled(Image)`
  ${imageStyles};
`

const InlineSvg = styled.svg`
  ${imageStyles};
`

const Placeholder = () => (
  <InlineSvg
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.414"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    focusable="false"
    viewBox="0 0 32 32"
    preserveAspectRatio="xMidYMid meet"
  >
    <g>
      <path fill={color.inactiveBackground} d="M0 0h32v32H0z" />
      <path
        d="M28.45 32H3.608c-.115-1.43.033-2.87.472-4.235C4.957 25.631 6.762 24 8.864 24h1.078c1.695 1.25 3.79 2 6.065 2 2.273 0 4.368-.75 6.063-2h1.066c2.101 0 3.907 1.631 4.784 3.765A10.58 10.58 0 0 1 28.45 32z"
        fill={color.inactive}
      />
      <path d="M23 16a7 7 0 1 1-14 0 7 7 0 0 1 14 0" fill={color.info} />
    </g>
  </InlineSvg>
)

export interface AvatarProps {
  size?: number
  src?: string | null
  alt?: string
}

const Avatar: React.FC<AvatarProps> = ({
  size = 32,
  src,
  alt = 'Avatar',
  ...props
}) => (
  <Wrapper size={size} {...props}>
    {src ? (
      <StyledImage
        src={src}
        alt={alt}
        data-testid="image"
        width={size}
        height={size}
      />
    ) : (
      <Placeholder />
    )}
  </Wrapper>
)

export { Avatar, Placeholder }
