import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Spinner as SpinnerIcon } from '@ticketswap/comets'
import { color } from '../../theme'

export interface SpinnerProps {
  size?: number
}

const StyledSpinnerIcon = styled(SpinnerIcon)`
  [data-theme='dark'] & {
    color: ${color.space};
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Rotate = styled.div`
  animation: ${rotate} 1s cubic-bezier(0.65, 0.25, 0.25, 0.75) infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Spinner: React.FC<SpinnerProps> = ({ size = 32, ...props }) => (
  <Rotate {...props} role="status">
    <StyledSpinnerIcon size={size} />
  </Rotate>
)
