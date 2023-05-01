import React from 'react'
import styled from '@emotion/styled'
import { color, space, radius, shadow } from '../theme'
import { H1 } from '../components/Heading'

const CustomCard = styled.div`
  background-color: ${color.background};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.strong};
  padding: ${space[48]};
`

export const ContainerWithShadow = () => (
  <CustomCard>
    <H1>This is a large container with shadow.</H1>
  </CustomCard>
)

ContainerWithShadow.storyName = 'Container with Shadow'

const story = {
  title: 'Components/Theme',
}

export default story
