import styled from '@emotion/styled'
import { color, device, fontSize, fontWeight, lineHeight } from '../../theme'

export const H1 = styled.h1`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize[32]};
  line-height: ${lineHeight.title};
  text-wrap: balance;

  @media ${device.tablet} {
    font-size: ${fontSize[56]};
    line-height: ${lineHeight.titleLg};
  }
`

export const H2 = styled.h2`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize[24]};
  line-height: ${lineHeight.title};
  text-wrap: balance;

  @media ${device.tablet} {
    font-size: ${fontSize[32]};
  }
`

export const H3 = styled.h3`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize[20]};
  line-height: ${lineHeight.title};

  @media ${device.tablet} {
    font-size: ${fontSize[24]};
  }
`

export const H4 = styled.h4`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize[18]};
  line-height: ${lineHeight.copy};

  @media ${device.tablet} {
    font-size: ${fontSize[20]};
  }
`

export const H5 = styled.h5`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize[14]};

  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`

export const H6 = styled.h6`
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize[12]};
  text-transform: uppercase;
  letter-spacing: 0.0375rem;
  color: ${color.foregroundSubtle};

  @media ${device.tablet} {
    font-size: ${fontSize[12]};
  }
`
