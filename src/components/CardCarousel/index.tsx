import styled from '@emotion/styled'
import React, { useState } from 'react'
import { color, space, device, radius } from '../../theme'
import { ChevronLeft, ChevronRight } from '../../icons'

export interface CardCarouselProps {
  cards: Array<React.ReactNode>
  leftHeader: React.ReactNode
  rightHeader?: React.ReactNode
}

const Carousel = styled.div``

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${space[16]};

  @media ${device.tablet} {
    margin-bottom: ${space[32]};
  }
`

const Controls = styled.div`
  display: none;

  @media ${device.tablet} {
    display: flex;
    gap: ${space[8]};
  }
`

const Control = styled.button`
  background-color: ${color.skyLightAlpha};
  width: 56px;
  height: 56px;
  border-radius: ${radius.md};
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: ${color.skyLightAlpha};
    opacity: 0.5;
    cursor: default;
  }
`

interface CardsProps {
  index: number
}

const Cards = styled.div<CardsProps>`
  display: flex;
  overflow: scroll;
  padding: ${space[16]};
  margin: -${space[16]};
  -ms-overflow-style: none;
  scrollbar-width: none;
  gap: ${space[16]};

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.tablet} {
    padding: unset;
    margin: unset;
    overflow: unset;

    display: grid;
    grid-template-columns: 1fr 1fr;

    > div {
      display: none;
    }

    > div:nth-of-type(${props => props.index}) {
      display: block;
      width: 100%;
    }

    > div:nth-of-type(${props => props.index + 1}) {
      display: block;
      width: 100%;
    }
  }
`

export const CardCarousel: React.FC<CardCarouselProps> = ({
  leftHeader,
  rightHeader,
  cards,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => setActiveIndex(activeIndex + 1)
  const handlePrevious = () => setActiveIndex(activeIndex - 1)
  const nextDisabled = activeIndex >= cards.length - 2
  const previousDisabled = activeIndex === 0

  return (
    <Carousel {...props}>
      <Header>
        <>
          <div>{leftHeader}</div>

          {rightHeader ? (
            rightHeader
          ) : (
            <Controls>
              <Control onClick={handlePrevious} disabled={previousDisabled}>
                <ChevronLeft
                  color={false ? color.spaceLightest : color.earth}
                  size={18}
                />
              </Control>
              <Control onClick={handleNext} disabled={nextDisabled}>
                <ChevronRight
                  color={false ? color.spaceLightest : color.earth}
                  size={18}
                />
              </Control>
            </Controls>
          )}
        </>
      </Header>
      <Cards index={activeIndex + 1}>{cards}</Cards>
    </Carousel>
  )
}
