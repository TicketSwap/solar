import styled from '@emotion/styled'
import {
  radius,
  shadow,
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
  background-color: ${color.background};
  box-shadow: ${shadow.strong};

  @media ${device.mobileL} {
    ${resetFullBleed};
    border-radius: ${radius.lg};
  }
`

export const PanelContent = styled.div<PanelContentProps>`
  padding: ${space[16]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props =>
    props.bgColor ? props.bgColor : color.background};

  &:first-of-type {
    border-top-left-radius: ${radius.lg};
    border-top-right-radius: ${radius.lg};
  }

  &:last-of-type {
    border-bottom-left-radius: ${radius.lg};
    border-bottom-right-radius: ${radius.lg};
  }

  :not(:first-of-type) {
    border-top: 1px solid ${color.stroke};
  }

  @media ${device.tablet} {
    padding: ${space[24]};
  }
`

export const PanelBody = styled.div`
  width: 100%;

  > * + * {
    margin-top: ${space[8]};
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
  padding-left: ${space[16]};
`
