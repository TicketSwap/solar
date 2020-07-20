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

export const Panel = styled.div`
  ${fullBleed};
  background-color: ${color.nova};
  box-shadow: ${shadow.strong};

  @media ${device.mobileL} {
    ${resetFullBleed};
    border-radius: ${radius.lg};
  }
`

export const PanelContent = styled.div`
  padding: ${space[16]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${p => (p.bgColor ? p.bgColor : color.nova)};

  &:first-of-type {
    border-top-left-radius: ${radius.lg};
    border-top-right-radius: ${radius.lg};
  }

  &:last-of-type {
    border-bottom-left-radius: ${radius.lg};
    border-bottom-right-radius: ${radius.lg};
  }

  & + ${() => PanelContent} {
    border-top: 1px solid ${color.spaceLightest};
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
  color: ${color.spaceMedium};

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
