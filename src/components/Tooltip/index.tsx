import React, { ReactElement } from 'react'
import styled from '@emotion/styled'
import { Portal } from '../Portal'
import { radius, color, space, fontSize } from '../../theme'
import { Global, css } from '@emotion/react'
import { useTooltip, TooltipPopup, TooltipPopupProps } from '@reach/tooltip'

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
      insetInlineStart: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
      insetBlockStart: triggerRect.bottom + 8 + window.scrollY,
    }
  }
  return { insetInlineStart: 0, insetBlockStart: 0 }
}

const Popup = styled<React.FC<TooltipPopupProps>>(TooltipPopup)`
  pointer-events: none;
  position: absolute;
  margin-block-start: 4px;
  padding-block: ${space[8]};
  padding-inline: ${space[12]};
  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);
  white-space: nowrap;
  font-size: ${fontSize[16]};
  color: ${color.invertedForeground};
  border: 0;
  border-radius: ${radius.md};
  background: ${color.invertedBackground};
`

interface TriangleStyleProps {
  size: number
}

const Triangle = styled.div<TriangleStyleProps>`
  position: absolute;
  inline-size: 0;
  block-size: 0;
  border-inline-start: ${props => props.size || 10}px solid transparent;
  border-inline-end: ${props => props.size || 10}px solid transparent;
  border-block-end: ${props => props.size || 10}px solid
    ${color.invertedBackground};
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
      <Popup
        {...tooltip}
        label={label}
        aria-label={ariaLabel}
        position={centered}
      />
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
              insetInlineStart: triggerRect
                ? triggerRect.left - triangleSize + triggerRect.width / 2
                : 0,
              insetBlockStart: triggerRect
                ? triggerRect.bottom + 2 + window.scrollY
                : 0,
            }}
            size={triangleSize}
          />
        </Portal>
      )}
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
