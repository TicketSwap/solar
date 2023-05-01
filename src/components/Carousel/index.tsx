import styled from '@emotion/styled'
import scrollIntoView from 'scroll-into-view-if-needed'
import React, { ReactNode, ReactElement, useState } from 'react'
import { color, space, radius, device } from '../../theme'
import { ChevronLeft, ChevronRight } from '../../icons'

const CarouselContainer = styled.div`
  overflow: hidden;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: ${space[8]};
`
const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${space[8]};
`
const Control = styled.button`
  display: none;

  @media ${device.tablet} {
    inline-size: ${space[32]};
    block-size: ${space[32]};
    border-radius: ${radius.md};
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: ${color.actionBackground};
    }

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
`
interface CardProps {
  amountOfCards: number
  numberOfColums: number
}

const Cards = styled.div<CardProps>`
  display: grid;
  grid-template-columns: ${({ amountOfCards }) =>
    `repeat(${amountOfCards}, 1fr)`};
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  grid-gap: ${space[16]};
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.tablet} {
    overflow-x: inherit;
  }
`

interface Props {
  id: string
  leftHeader: ReactNode
  rightHeader?: ReactNode
  cards: ReactElement[]
  numberOfColumns?: 1 | 2
}

export const Carousel = ({
  id,
  leftHeader,
  rightHeader,
  cards,
  numberOfColumns = 1,
  ...props
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const amountOfCardsIsOdd = cards.length % 2 === 1
  const lastOddCard =
    numberOfColumns === 2 &&
    amountOfCardsIsOdd &&
    activeIndex === cards.length - 2

  const scrollToCard = (accumulator: number) => {
    const carouselNode = document.getElementById(id)
    const node = carouselNode?.children[accumulator] || null

    if (!node) return false

    scrollIntoView(node, {
      behavior: 'smooth',
      scrollMode: 'if-needed',
      inline: 'nearest',
      boundary: carouselNode,
    })
  }

  const handleNext = () => {
    const accumulator =
      numberOfColumns === 1
        ? activeIndex + 1
        : activeIndex + numberOfColumns + 1

    setActiveIndex(lastOddCard ? accumulator - numberOfColumns : accumulator)
    scrollToCard(lastOddCard ? accumulator - numberOfColumns : accumulator)
  }

  const handlePrevious = () => {
    const accumulator =
      numberOfColumns === 1 ? activeIndex - 1 : activeIndex - numberOfColumns

    setActiveIndex(accumulator)
    scrollToCard(accumulator)
  }

  const nextDisabled = activeIndex >= cards.length - 1
  const previousDisabled = activeIndex === 0

  return (
    <CarouselContainer {...props}>
      <Header>
        {leftHeader}

        <Controls>
          {cards.length > numberOfColumns && (
            <>
              <Control onClick={handlePrevious} disabled={previousDisabled}>
                <ChevronLeft color={color.action} size={18} />
              </Control>
              <Control onClick={handleNext} disabled={nextDisabled}>
                <ChevronRight color={color.action} size={18} />
              </Control>
            </>
          )}

          {rightHeader}
        </Controls>
      </Header>

      <Cards
        id={id}
        amountOfCards={cards.length}
        numberOfColums={numberOfColumns}
      >
        {cards}
      </Cards>
    </CarouselContainer>
  )
}
