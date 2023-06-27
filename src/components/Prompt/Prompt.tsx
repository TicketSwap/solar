import React from 'react'
import { ReactElement } from 'react'
import styled from '@emotion/styled'
import { color, device, fontWeight, radius, space } from '../../theme'
import { H3 } from '../Heading'
import { Text } from '../Text'
import { StylisedIcon } from '../StylisedIcon'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--_promptPadding, ${space[32]});
  border-radius: ${radius.lg};
  text-align: center;
  gap: ${space[16]};

  @media ${device.tablet} {
    padding: var(--_promptPadding, ${space[48]});
  }
`

const TextContent = styled.div`
  display: grid;
  gap: ${space[4]};
`

const Title = styled(H3)`
  font-weight: ${fontWeight.semiBold};
  text-wrap: balance;

  @media ${device.tablet} {
    font-size: ${space[24]};
  }
`

const Subtitle = styled(Text)`
  color: ${color.foregroundMuted};
  text-wrap: balance;
`

interface Props {
  title: string
  subtitle?: string
  action?: ReactElement
  icon: ReactElement
}

export const Prompt = ({ title, subtitle, action, icon }: Props) => {
  return (
    <Container>
      <StylisedIcon icon={icon} />

      <TextContent>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TextContent>

      {action}
    </Container>
  )
}
