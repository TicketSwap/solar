import styled from '@emotion/styled'
import {
  radius,
  color,
  space,
  device,
  fullBleed,
  resetFullBleed,
} from '../../theme'

export interface PanelContentProps {
  bgColor?: string
}

export const Panel = styled.div`
  ${fullBleed};
  border: 1px solid ${color.stroke};

  @media ${device.mobileL} {
    ${resetFullBleed};
    border-radius: ${radius.lg};
  }
`

export const PanelContent = styled.div<PanelContentProps>`
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props =>
    props.bgColor ? props.bgColor : color.background};

  &:first-of-type {
    border-start-start-radius: ${radius.lg};
    border-start-end-radius: ${radius.lg};
  }

  &:last-of-type {
    border-end-start-radius: ${radius.lg};
    border-end-end-radius: ${radius.lg};
  }

  :not(:first-of-type) {
    border-block-start: 1px solid ${color.stroke};
  }

  @media ${device.tablet} {
    padding-block: ${space[24]};
    padding-inline: ${space[24]};
  }
`

export const PanelBody = styled.div`
  inline-size: 100%;

  > * + * {
    margin-block-start: ${space[8]};
  }
`

export const PanelText = styled.p`
  color: ${color.foregroundMuted};

  span {
    display: block;
  }
`

export const PanelFooter = styled.div`
  position: relative;
  flex-basis: ${space[32]};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline-start: ${space[16]};
`
