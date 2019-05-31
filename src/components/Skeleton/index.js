import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
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
  height: 100%;
  width: 100%;
  background-image: ${props =>
    props.theme === 'dark'
      ? `linear-gradient(
          -90deg, 
          rgba(0,0,0,0.07) 0%, 
          rgba(0,0,0,0.04) 50%, 
          rgba(0,0,0,0.07) 100%
        )`
      : `linear-gradient(
          -90deg, 
          rgba(255,255,255,0.1) 0%, 
          rgba(255,255,255,0.08) 50%, 
          rgba(255,255,255,0.1) 100%
        )`};
  background-size: 400% 400%;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-name: ${pulse};
`

SkeletonPulse.defaultProps = {
  theme: 'dark',
}

export const SkeletonLine = styled(SkeletonPulse)`
  width: ${props => (props.width ? props.width * 100 : 75)}%;
  border-radius: ${radius.md};
  line-height: 100%;

  &::before {
    content: '\u200b';
  }
`
