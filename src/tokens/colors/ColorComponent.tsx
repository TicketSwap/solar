import React from 'react'
import styled from '@emotion/styled'
import { getColorsArray } from '../../utils/getColorsArray'
import { space, radius, shadow } from '../../theme'
import { H2, H3 } from '../../'

const StyledH2 = styled(H2)`
  margin-bottom: ${space[16]};
  text-transform: capitalize;
`

const ColorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${space[8]};
`

const StyledPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${space[88]};
  padding: ${space[16]};
  background-color: ${props => props.color};
  box-shadow: ${shadow.strong};
  border-radius: ${radius.sm};

  &:first-of-type {
    grid-column: span 2;
  }
`

const StyledH3 = styled(H3)`
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  color: white;
`

export interface ColorComponentProps {
  name: string
}

/*

@TODO: Add default color prop so we can have a bit more control on edge cases such as nova

*/

export const ColorComponent = ({ name }: ColorComponentProps) => {
  const colorsArray = getColorsArray(name)

  return (
    <>
      <StyledH2>{name}</StyledH2>
      <ColorsContainer>
        {colorsArray.map(({ name, color }: { name: string; color: string }) => {
          return (
            <StyledPanel color={color}>
              <StyledH3>{name}</StyledH3>
            </StyledPanel>
          )
        })}
      </ColorsContainer>
    </>
  )
}
