import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { color, globalStyles } from '../../../src'
import { shadow, space, radius } from '../../../src/theme'
import { H3 } from '../../../src/components/Heading'
import { Text } from '../../../src/components/Text'
import { colors } from './data'

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space[16]};
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  border-radius: ${radius.sm};
  box-shadow: ${shadow.strong};
`

interface StyledHeadingProps {
  variant: string
}

const StyledHeading = styled(H3)<StyledHeadingProps>`
  color: ${props => props.variant};
`

const Description = styled(Text)`
  color: ${color.foregroundSubtle};
`

const KeywordContainer = styled.div`
  span:not(:last-child) {
    &:after {
      content: '\\00B7';
      padding-inline-start: ${space[8]};
      padding-inline-end: ${space[8]};
    }
  }
`

const DefinitionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${space[32]};
  margin-block-start: ${space[16]};
`

const Representation = ({ keyWords }) => {
  return (
    <KeywordContainer>
      {keyWords.map(keyWord => (
        <Text>{keyWord}</Text>
      ))}
    </KeywordContainer>
  )
}

const Color = ({ variant, label }) => {
  return (
    <>
      <StyledHeading variant={variant}>{label}</StyledHeading>
    </>
  )
}

const ColorGrid = ({ children }) => <DefinitionsGrid>{children}</DefinitionsGrid>

const ColorDefinition = ({ variant, label, description, keyWords = [] }) => {
  return (
    <Grid>
      <Color variant={variant} label={label} />
      <Description>{description}</Description>

      <Representation keyWords={keyWords} />
    </Grid>
  )
}

export const ColorDefinitions = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <ColorGrid>
        {colors.map(({ label, variant, description, keyWords }) => (
          <ColorDefinition
            key={label}
            variant={variant}
            label={label}
            description={description}
            keyWords={keyWords}
          />
        ))}
      </ColorGrid>
    </>
  )
}
