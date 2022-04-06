import React from 'react'
import { render } from '../../../test/test.utils'
import { matchers } from '@emotion/jest'
import { Pill, PillVariant } from '.'
import { color } from '../../theme'

expect.extend(matchers)

describe('Pill', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(<Pill>Primary</Pill>)
    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/Primary/i)).toBeInTheDocument()
  })

  it('renders a variant correctly', () => {
    const { container, getByText } = render(
      <Pill variant={PillVariant.success}>Success</Pill>
    )
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      color.success
    )
    expect(getByText(/Success/i)).toHaveStyleRule('color', color.onSuccess)
  })
})
