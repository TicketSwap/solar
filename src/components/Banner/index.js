import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { color, space, device, radius } from '../../theme'
import { ChevronRightAlt } from '@ticketswap/comets'

const Container = styled.a`
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

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Banner = ({ backgroundImageUrl, children, url, ...props }) => {
  return (
    <Container backgroundImageUrl={backgroundImageUrl} href={url} {...props}>
      <Content>
        <div>{children}</div>
        <ChevronRightAlt />
      </Content>
    </Container>
  )
}

Banner.propTypes = {
  backgroundImageUrl: PropTypes.string,
  url: PropTypes.string,
}
