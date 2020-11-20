import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { space, color, radius, fontSize, lineHeight } from '../../theme'

export interface SpeechBubbleProps {
  children: ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
  tailOffset?: number
}

interface StyledProps {
  verticalAlign?: string
  horizontalAlign?: string
  tailOffset?: number
}

const SpeechBubbleBottomContent = (props: StyledProps) => css`
  margin-top: ${space[12]};

  &::before {
    top: -10px;

    ${props.horizontalAlign === 'left' &&
    css`
      left: calc(8px + ${props.tailOffset}px);
    `}

    ${props.horizontalAlign === 'right' &&
    css`
      transform: scaleX(-1);
      right: calc(8px + ${props.tailOffset}px);
    `};
  }
`

const SpeechBubbleTopContent = (props: StyledProps) => css`
  margin-bottom: ${space[12]};

  &::before {
    bottom: -10px;

    ${props.horizontalAlign === 'left' &&
    css`
      left: calc(8px + ${props.tailOffset}px);
      transform: rotate(180deg) scaleX(-1);
    `}

    ${props.horizontalAlign === 'right' &&
    css`
      transform: rotate(180deg);
      right: calc(8px + ${props.tailOffset}px);
    `};
  }
`

const SpeechBubbleContent = styled.div<StyledProps>`
  ${props => props.verticalAlign === 'bottom' && SpeechBubbleBottomContent}
  ${props => props.verticalAlign === 'top' && SpeechBubbleTopContent}

  position: relative;
  display: inline-block;
  padding: ${space[16]};
  color: ${color.space};
  font-size: ${fontSize[16]};
  line-height: ${lineHeight.title};
  background: ${color.stardust};
  border-radius: ${radius.lg};

  &::before {
    content: '';
    background-image: url("data:image/svg+xml,%0A%3Csvg width='21px' height='14px' viewBox='0 0 21 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Others-/-Comment' transform='translate(-14.000000, 1.000000)' fill='%23F5F5F6'%3E%3Cg transform='translate(0.000000, -1.000000)' id='Rectangle-3'%3E%3Cpath d='M17.0671959,1 C17.9099694,3.55078125 19.9506595,5.68636068 23.1892663,7.40673828 C26.427873,9.12711589 30.3871829,10.1453451 35.0671959,10.4614258 C28.3544315,12.4808496 23.6868506,13.5483952 21.0644531,13.6640625 C18.4420557,13.7797298 16.5191418,13.0028744 15.2957116,11.3334961 C14.2804121,9.90364583 13.8617923,8.18139648 14.0398522,6.16674805 C14.3034568,3.18420944 16.1278714,-1.84300779 17.0671959,1 Z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-repeat: no-repeat;
    height: 12px;
    width: 24px;
    position: absolute;
  }
`

export const SpeechBubble = ({
  children,
  position = 'bottom-left',
  tailOffset = 8,
  ...props
}: SpeechBubbleProps) => {
  const [verticalPosition, horizontalPosition] = position.split('-')

  return (
    <SpeechBubbleContent
      verticalAlign={verticalPosition}
      horizontalAlign={horizontalPosition}
      tailOffset={tailOffset}
      {...props}
    >
      {children}
    </SpeechBubbleContent>
  )
}
