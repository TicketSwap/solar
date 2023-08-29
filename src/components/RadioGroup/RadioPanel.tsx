import React, { ChangeEvent, ReactNode } from 'react'
import { Panel, PanelBody, PanelContent } from '../Panel'
import styled from '@emotion/styled'
import { Radio, RadioProps } from '../RadioGroup/Radio'
import { fontWeight, space } from '../../theme'
import { Label } from '../Input'

export interface RadioOption
  extends Omit<RadioProps, 'id' | 'value' | 'label'> {
  id: string
  value: string
  label: ReactNode
  description?: ReactNode
}

export interface RadioPanelProps {
  options: RadioOption[]
  value: string
  name: string
  loading: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Wrapper = styled.span`
  label {
    display: grid;
    grid-template-columns: ${space[24]} 1fr;
    align-items: center;
    gap: ${space[16]};
    font-weight: ${fontWeight.semiBold};
  }
`

export const RadioPanel = ({
  name,
  value,
  options = [],
  loading,
  onChange,
}: RadioPanelProps) => (
  <Panel>
    {options.map(({ description = <></>, ...option }) => (
      <PanelContent key={option.id}>
        <PanelBody>
          <Wrapper>
            <Label htmlFor={option.id}>
              <Radio
                name={name}
                checked={option.value === value}
                loading={loading !== '' && option.value === loading}
                onChange={onChange}
                {...option}
              />
              {option.label}
            </Label>
          </Wrapper>
          {description}
        </PanelBody>
      </PanelContent>
    ))}
  </Panel>
)
