import React from 'react'
import { Combobox } from '.'
import { render, screen } from '../../../test/test.utils'

describe('Combobox', () => {
  it('renders without crashing', () => {
    render(
      <Combobox
        id="country"
        label="Country"
        value="nl"
        options={[
          { id: 'nl', label: 'Netherlands', value: 'nl' },
          { id: 'be', label: 'Belgium', value: 'be' },
        ]}
      />
    )

    expect(screen.getByLabelText('Country')).toHaveValue('Netherlands')
  })
})
