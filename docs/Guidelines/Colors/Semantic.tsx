import React from 'react'
import { fontWeight, Text, space, SmallText } from '../../../src'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { semanticColors } from './data'

const Categories = styled.div`
  display: grid;
  grid-gap: ${space[24]};
`

const CategoryTitle = styled(Text)`
  display: block;
  margin-block-end: ${space[8]};
  font-weight: ${fontWeight.semiBold};
`

const ColorGrid = styled.div`
  display: grid;
  grid-gap: ${space[16]};
  grid-template-columns: repeat(auto-fit, 200px);
`

type ColorCardProps = {
  color: string
  foregroundColor: string
}

const ColorCard = styled.div<ColorCardProps>`
  width: 200px;
  height: 144px;
  border-radius: ${space[16]};
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  display: grid;
  grid-template-rows: 1fr auto auto;
  border: 1px solid #e5e7e8;

  ${SmallText}:first-of-type {
    font-weight: ${fontWeight.semiBold};
  }

  ${({ color, foregroundColor }) => css`
    background-color: ${color};
    color: ${foregroundColor};
  `}
`

type CardProps = {
  color: string
  title: string
  colorValue: string
  foregroundColor: string
}

const Card = ({ color, title, colorValue, foregroundColor }: CardProps) => {
  const colorTitle = color.match(/(\w+)\)/)?.[1] || ''

  return (
    <ColorCard color={color} foregroundColor={foregroundColor}>
      <SmallText>{title}</SmallText>
      <SmallText>{colorTitle}</SmallText>
      <SmallText>{colorValue}</SmallText>
    </ColorCard>
  )
}

const Semantic = () => {
  return (
    <Categories>
      {semanticColors.map(category => (
        <div>
          <CategoryTitle>{category.title}</CategoryTitle>
          <ColorGrid>
            {category.colors.map(type => {
              const { label, variant, hex, foreground } = type

              return (
                <Card color={variant} title={label} colorValue={hex} foregroundColor={foreground} />
              )
            })}
          </ColorGrid>
        </div>
      ))}
    </Categories>
  )
}

export default Semantic
