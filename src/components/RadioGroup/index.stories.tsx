import React, { useState } from 'react'
import styled from '@emotion/styled'
import { color, space } from '../../theme'
import { Text } from '../Text'
import { Checkmark } from '../../icons'
import { Instruction } from '../Instruction'
import { RadioGroup } from './RadioGroup'
import { RadioPanel } from './RadioPanel'

export default {
  title: 'Components/Inputs/RadioGroup',
}

const Price = styled(Text)`
  color: ${color.foregroundMuted};
  margin-inline-start: ${space[40]};
`

const USPS = styled.div`
  margin-block-start: ${space[16]};
  margin-block-end: ${space[16]};
`

const USP = styled.div`
  display: flex;
  gap: ${space[8]};
  margin-block-end: ${space[16]};
`

export const Default = () => {
  const [value, setValue] = useState('')

  return (
    <RadioGroup
      legend="Who's the best?"
      name="whos-the-best"
      options={[
        { id: 'Emeline', value: 'Emeline', label: 'Emeline' },
        { id: 'Diogo', value: 'Diogo', label: 'Diogo' },
        { id: 'Ronald', value: 'Ronald', label: 'Ronald' },
        { id: 'Glenn', value: 'Glenn', label: 'Glenn' },
        { id: 'Rob', value: 'Rob', label: 'Rob', disabled: true },
        { id: 'Bob', value: 'Bob', label: 'Bob' },
        { id: 'Viktor', value: 'Viktor', label: 'Viktor' },
      ]}
      value={value}
      instruction={<Instruction>Choose your favorite (Glenn)</Instruction>}
      onChange={event => {
        console.log(event)
        setValue(event.target.value)
      }}
    />
  )
}

export const WithPanel = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState('')

  return (
    <RadioPanel
      name="Ice Cream"
      options={[
        {
          id: '1',
          value: '1',
          label: 'With chocolate topping',
          description: (
            <>
              <Price>2.00€</Price>
              <USPS>
                <USP>
                  <Checkmark size={24} color={color.info} />
                  <Text as="p">Rich Source of Antioxidants</Text>
                </USP>
                <USP>
                  <Checkmark size={24} color={color.info} />
                  <Text as="p">Heart Health</Text>
                </USP>
                <USP>
                  <Checkmark size={24} color={color.info} />
                  <Text as="p">Improved Mood</Text>
                </USP>
              </USPS>
            </>
          ),
        },
        {
          id: '2',
          value: '2',
          label: 'With almonds topping',
          description: (
            <>
              <Price>2.50€</Price>
              <USPS>
                <USP>
                  <Checkmark size={24} color={color.info} />
                  <Text as="p">Nutrient-Rich</Text>
                </USP>
                <USP>
                  <Checkmark size={24} color={color.info} />
                  <Text as="p">Blood Sugar Control</Text>
                </USP>
                <USP>
                  <Checkmark size={24} color={color.info} />
                  <Text as="p">Brain Health</Text>
                </USP>
              </USPS>
            </>
          ),
        },
        {
          id: '3',
          value: '3',
          label: 'Without extras',
        },
      ]}
      value={value}
      loading={loading}
      onChange={event => {
        setLoading(event.target.value)
        setTimeout(() => {
          setValue(event.target.value)
          setLoading('')
        }, 500)
      }}
    />
  )
}
