import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { color, space, device, radius } from '../../theme'
import { ChevronRightAlt } from '../../icons'

const Container = styled.div<BannerProps>`
  position: relative;
  background-color: ${color.foreground};
  background-position: center;
  background-size: cover;
  color: ${color.elevatedBackground};
  cursor: pointer;
  display: block;
  padding-block-start: ${space[32]};
  padding-block-end: ${space[32]};
  padding-inline-start: ${space[16]};
  padding-inline-end: ${space[8]};
  text-decoration: none;

  ${props => css`
    background-image: url(${props.backgroundImageUrl});
  `};

  /* Span entire viewport width on mobile */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-inline-start: -50vw;
  margin-inline-end: -50vw;

  @media ${device.tablet} {
    padding-inline-start: ${space[32]};
    padding-inline-end: ${space[16]};
    border-radius: ${radius.lg};
    width: auto;
    left: auto;
    right: auto;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`

const StyledChevronRightAlt = styled(ChevronRightAlt)`
  color: ${color.lightForeground};
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    color: ${color.lightForeground};
  }
`

export interface BannerProps {
  backgroundImageUrl: string
}

const Banner: React.FC<BannerProps> = ({ backgroundImageUrl, children, ...props }) => {
  return (
    <Container backgroundImageUrl={backgroundImageUrl} {...props}>
      <Content>
        <div>{children}</div>
        <StyledChevronRightAlt />
      </Content>
    </Container>
  )
}

export { Banner }
