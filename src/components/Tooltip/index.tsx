import React, { ReactElement } from 'react'
import styled from '@emotion/styled'
import { Portal } from '../Portal'
import { radius, color, space } from '../../theme'
import { Global, css } from '@emotion/core'
import { useTooltip, TooltipPopup } from '@reach/tooltip'

export interface TooltipProps {
  label?: string
  'aria-label'?: string
  children: ReactElement
}

const centered = (
  triggerRect: Partial<DOMRect> | null | undefined,
  tooltipRect: Partial<DOMRect> | null | undefined
) => {
  if (
    triggerRect &&
    triggerRect.left &&
    triggerRect.width &&
    triggerRect.bottom &&
    tooltipRect &&
    tooltipRect.width
  ) {
    const triggerCenter = triggerRect.left + triggerRect.width / 2
    const left = triggerCenter - tooltipRect.width / 2
    const maxLeft = window.innerWidth - tooltipRect.width - 2
    return {
      left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
      top: triggerRect.bottom + 8 + window.scrollY,
    }
  }
  return { left: 0, top: 0 }
}

const Popup = styled(TooltipPopup)`
  z-index: 10;
  pointer-events: none;
  position: absolute;
  padding: ${space[8]} ${space[12]};
  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);
  white-space: nowrap;
  font-size: inherit;
  color: ${color.nova};
  border: 0;
  border-radius: ${radius.md};
  background: ${color.spaceMedium};
`

interface TriangleStyleProps {
  size: number
}

const Triangle = styled.div<TriangleStyleProps>`
  position: absolute;
  z-index: 11;
  width: 0;
  height: 0;
  border-left: ${props => props.size || 10}px solid transparent;
  border-right: ${props => props.size || 10}px solid transparent;
  border-bottom: ${props => props.size || 10}px solid ${color.spaceMedium};
`

export const Tooltip = ({
  label,
  'aria-label': ariaLabel,
  children,
}: TooltipProps) => {
  const [trigger, tooltip] = useTooltip()
  const { isVisible, triggerRect } = tooltip
  const triangleSize = 10

  return (
    <>
      {React.cloneElement(children, trigger)}
      {isVisible && (
        // Position the triangle relative to the trigger, not the
        // popup so that collisions don't have a triangle pointing off
        // to nowhere. Using a Portal may seem a little extreme, but
        // we can keep the positioning logic simpler here instead of
        // needing to consider the popup's position relative to the
        // trigger and collisions.
        <Portal>
          <Triangle
            style={{
              left: triggerRect
                ? triggerRect.left - triangleSize + triggerRect.width / 2
                : 0,
              top: triggerRect ? triggerRect.bottom + 1 + window.scrollY : 0,
            }}
            size={triangleSize}
          />
        </Portal>
      )}
      <Popup
        {...tooltip}
        label={label}
        aria-label={ariaLabel}
        position={centered}
      />
      <Global
        styles={css`
          :root {
            --reach-tooltip: 1;
          }
        `}
      />
    </>
  )
}
