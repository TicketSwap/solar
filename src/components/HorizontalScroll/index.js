import styled from 'styled-components'
import { space, device } from '../../theme'

export const HorizontalScroll = styled.div`
  position: relative;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  scroll-padding: ${space[16]};
  padding-left: ${space[16]};
  padding-right: ${space[16]};

  @media ${device.tablet} {
    padding: 0;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  > * + * {
    margin-left: ${space[16]};
  }

  /* Span entire viewport width on mobile */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media ${device.tablet} {
    width: auto;
    left: auto;
    right: auto;
    margin-left: 0;
    margin-right: 0;
  }
`
