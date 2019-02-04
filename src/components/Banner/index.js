import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, space, device, radius } from '../../theme'
import { Icon } from '../Icon'
import { Box } from '../Box'

const StyledBanner = styled.a`
  position: relative;
  background-color: ${color.space};
  background-position: center;
  background-size: cover;
  color: ${color.stardust};
  cursor: pointer;
  display: block;
  padding-top: ${space[32]};
  padding-bottom: ${space[32]};
  padding-left: ${space[16]};
  padding-right: ${space[8]};
  text-decoration: none;

  ${props =>
    props.backgroundImageUrl &&
    css`
      background-image: url(${props.backgroundImageUrl});
    `};

  /* Span entire viewport width on mobile */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media ${device.tablet} {
    padding-left: ${space[32]};
    padding-right: ${space[16]};
    border-radius: ${radius.md};
    width: auto;
    left: auto;
    right: auto;
    margin-left: 0;
    margin-right: 0;
  }
`

export const Banner = ({ backgroundImageUrl, children, url, ...props }) => {
  return (
    <StyledBanner backgroundImageUrl={backgroundImageUrl} href={url} {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div>{children}</div>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Icon glyph="arrow-right" />
        </Box>
      </Box>
    </StyledBanner>
  )
}

Banner.propTypes = {
  backgroundImageUrl: PropTypes.string,
  url: PropTypes.string,
}
