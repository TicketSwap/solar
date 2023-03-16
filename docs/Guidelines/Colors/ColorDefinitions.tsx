import React, { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { color, globalStyles } from '../../../src'
import { shadow, space, radius } from '../../../src/theme'
import { H3 } from '../../../src/components/Heading'
import { Text } from '../../../src/components/Text'
import { colors } from './data'
import { ReactNode } from 'react'

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

interface RepresentationProps {
  keyWords: string[]
}

const Representation = ({ keyWords }: RepresentationProps) => {
  return (
    <KeywordContainer>
      {keyWords.map(keyWord => (
        <Text>{keyWord}</Text>
      ))}
    </KeywordContainer>
  )
}

interface ColorProps {
  variant: string
  label: string
}

const Color = ({ variant, label }: ColorProps) => {
  return (
    <>
      <StyledHeading variant={variant}>{label}</StyledHeading>
    </>
  )
}

interface ColorGridProps {
  children: ReactNode
}

const ColorGrid = ({ children }: ColorGridProps) => (
  <DefinitionsGrid>{children}</DefinitionsGrid>
)

interface Props extends ColorProps, RepresentationProps {
  description: string
}

const ColorDefinition = ({ variant, label, description, keyWords }: Props) => {
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
