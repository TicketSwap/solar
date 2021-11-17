import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { color, space, device, radius } from '../../theme'
import { ChevronRightAlt } from '../../icons'

const Container = styled.div<BannerProps>`
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

  ${props => css`
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
    border-radius: ${radius.lg};
    width: auto;
    left: auto;
    right: auto;
    margin-left: 0;
    margin-right: 0;
  }
`

const StyledChevronRightAlt = styled(ChevronRightAlt)`
  color: ${color.nova};

  [data-theme='dark'] & {
    color: ${color.space};
  }
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
    color: ${color.nova};

    [data-theme='dark'] & {
      color: ${color.space};
    }
  }
`

export interface BannerProps {
  backgroundImageUrl: string
}

const Banner: React.FC<BannerProps> = ({
  backgroundImageUrl,
  children,
  ...props
}) => {
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
