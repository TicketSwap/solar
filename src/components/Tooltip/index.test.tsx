import React from 'react'
import { render } from '../../../test/test.utils'
import { Tooltip } from '.'

describe('Tooltip', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Tooltip label="Lorem ipsum">
        <button>
          <span aria-hidden>🔔</span>
        </button>
      </Tooltip>
    )

    expect(container.firstChild).toBeInTheDocument()
  })
})
