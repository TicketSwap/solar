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
  overflow: hidden;
  background-color: white;
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
  background-color: white;

  & + ${() => PanelContent} {
    border-top: 1px solid ${color.spaceLightest};
  }

  @media ${device.tablet} {
    padding: ${space[24]};
  }
`

export const PanelBody = styled.div`
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
