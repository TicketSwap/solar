import styled from '@emotion/styled'
import { space, device } from '../../theme'

export const HorizontalScroll = styled.div`
  position: relative;
  overflow-x: scroll;
  white-space: nowrap;
  scroll-padding-block: ${space[16]};
  padding-inline: ${space[16]};
  padding-inline-start: ${space[16]};
  padding-inline-end: ${space[16]};
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${device.tablet} {
    padding-block: 0;
    padding-inline: 0;
  }

  > * + * {
    margin-inline-start: ${space[16]};
  }

  /* Span entire viewport width on mobile */
  inline-size: 100vw;
  inset-inline: 50%;
  margin-inline-start: -50vw;
  margin-inline-end: -50vw;

  @media ${device.tablet} {
    inline-size: auto;
    inset-inline: auto;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`
