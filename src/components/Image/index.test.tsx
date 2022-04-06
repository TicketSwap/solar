import React from 'react'
import { render } from '../../../test/test.utils'
import { Image } from '.'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

describe('Image', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Image
        src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80"
        alt="Basic image"
      />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('can have rounded borders', () => {
    const { container } = render(
      <Image
        src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80"
        alt="Basic image"
        rounded
      />
    )

    expect(container.firstChild).toHaveStyleRule('border-radius', '0.75rem')
  })
})
