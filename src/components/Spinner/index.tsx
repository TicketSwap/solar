import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Spinner as SpinnerIcon } from '../../icons'

export interface SpinnerProps {
  size?: number
  color?: string
}

const StyledSpinnerIcon = styled(SpinnerIcon)`
  color: ${props => props.color || 'inherit'};
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

export const Spinner: React.FC<SpinnerProps> = ({
  size = 32,
  color,
  ...props
}) => (
  <Rotate {...props} role="status">
    <StyledSpinnerIcon size={size} color={color} />
  </Rotate>
)
