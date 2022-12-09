import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

export interface WrapperProps {
  iconSize?: number
  color?: string
}

const Wrapper = styled.span<WrapperProps>`
  display: inline-grid;
  place-items: center;
  vertical-align: middle;
  width: ${props => `${props.iconSize || 32}px`};
  height: ${props => `${props.iconSize || 32}px`};
  min-width: ${props => `${props.iconSize || 32}px`};
  min-height: ${props => `${props.iconSize || 32}px`};

  /*
    Overwrite the color from a styled component if
    there is a color prop supplied
  */
  color: ${({ color }) => (color ? `${color} !important` : 'inherit')};
`

const InlineSvg = styled.svg`
  color: inherit;
  fill: currentColor;
`

export interface SvgWrapperProps {
  size?: number
  children?: ReactNode
  a11yTitle: string
  color?: string
}

export const SvgWrapper: React.FC<SvgWrapperProps> = ({
  size = 32,
  children,
  a11yTitle,
  color,
  ...props
}) => (
  <Wrapper iconSize={size} className="icon" color={color} {...props}>
    <InlineSvg
      aria-label={a11yTitle}
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
      {children}
    </InlineSvg>
  </Wrapper>
)
