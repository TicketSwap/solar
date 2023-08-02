import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { radius } from '../../theme'

const pulse = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -135% 0%;
  }
`

export const SkeletonPulse = styled.span`
  display: inline-block;
  block-size: 100%;
  inline-size: 100%;
  background-image: linear-gradient(
    -90deg,
    rgba(0, 0, 0, 0.07) 0%,
    rgba(0, 0, 0, 0.04) 50%,
    rgba(0, 0, 0, 0.07) 100%
  );
  background-size: 400% 400%;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-name: ${pulse};

  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(
      -90deg,
      rgba(255, 255, 255, 0.07) 0%,
      rgba(255, 255, 255, 0.04) 50%,
      rgba(255, 255, 255, 0.07) 100%
    );
  }
`

export interface SkeletonLineProps {
  width?: number
}

export const SkeletonLine = styled(SkeletonPulse)<SkeletonLineProps>`
  inline-size: ${props => (props.width ? props.width * 100 : 75)}%;
  border-radius: ${radius.md};
  line-height: 100%;

  &::before {
    content: '\u200b';
  }
`
