import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { Spinner as SpinnerIcon } from '@ticketswap/comets'

export interface SpinnerProps {
  size?: number
}

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
  <Rotate {...props}>
    <SpinnerIcon size={size} />
  </Rotate>
)
