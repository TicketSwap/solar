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
  margin-block-end: ${space[16]};

  @media ${device.tablet} {
    margin-block-end: ${space[32]};
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
  background-color: ${color.actionBackground};
  inline-size: 56px;
  block-size: 56px;
  border-radius: ${radius.md};
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

interface CardsProps {
  index: number
}

const Cards = styled.div<CardsProps>`
  display: flex;
  overflow: scroll;
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  margin-block: -${space[16]};
  margin-inline: -${space[16]};
  -ms-overflow-style: none;
  scrollbar-width: none;
  gap: ${space[16]};

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.tablet} {
    padding-block: unset;
    padding-inline: unset;
    margin-block: unset;
    margin-inline: unset;
    overflow: unset;

    display: grid;
    grid-template-columns: 1fr 1fr;

    > div {
      display: none;
    }

    > div:nth-of-type(${props => props.index}) {
      display: block;
      inline-size: 100%;
    }

    > div:nth-of-type(${props => props.index + 1}) {
      display: block;
      inline-size: 100%;
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
                <ChevronLeft color={color.action} size={18} />
              </Control>
              <Control onClick={handleNext} disabled={nextDisabled}>
                <ChevronRight color={color.action} size={18} />
              </Control>
            </Controls>
          )}
        </>
      </Header>
      <Cards index={activeIndex + 1}>{cards}</Cards>
    </Carousel>
  )
}
