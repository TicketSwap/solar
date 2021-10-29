import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { globalStyles } from '../../../src'
import { H3 } from '../../../src/components/Heading'
import { Text } from '../../../src/components/Text'
import { space, color, fontSize } from '../../../src/theme'
import { colors } from './data'

interface ColorStrokeProps {
  hex: string
  backgroundColor: string
}

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`

const ColorStrokeContainer = styled.div<ColorStrokeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 300px;
  padding: ${space[16]};

  h3,
  span {
    color: ${props => (props.hex === '#FFFFFF' ? color.space : color.nova)};
  }

  background-color: ${props => props.backgroundColor};
`

const ColorValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ColorStrokeType = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: ${fontSize[12]};
  }
`

const ColorStroke = ({ label, cymk, rgb, hex, backgroundColor }) => {
  return (
    <ColorStrokeContainer backgroundColor={backgroundColor} hex={hex}>
      <H3>{label}</H3>
      <ColorValuesContainer>
        <ColorStrokeType>
          <Text>CYMK</Text>
          <Text>{cymk}</Text>
        </ColorStrokeType>
        <ColorStrokeType>
          <Text>RGB</Text>
          <Text>{rgb}</Text>
        </ColorStrokeType>
        <ColorStrokeType>
          <Text>HEX</Text>
          <Text>{hex}</Text>
        </ColorStrokeType>
      </ColorValuesContainer>
    </ColorStrokeContainer>
  )
}

export const PrintAndDigital = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <ContainerGrid>
        {colors.map(({ cymk, rgb, hex, label, variant }) => (
          <ColorStroke
            key={hex}
            cymk={cymk}
            rgb={rgb}
            hex={hex}
            label={label}
            backgroundColor={variant}
          />
        ))}
      </ContainerGrid>
    </>
  )
}
