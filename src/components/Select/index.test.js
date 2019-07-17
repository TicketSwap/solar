import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Select } from './'

const languages = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

describe('Select', () => {
  it('renders without crashing and has menu closed intially', () => {
    const { container, queryByText } = render(
      <Select id="language" label="Language" items={languages} />
    )
    expect(container.firstChild).toBeInTheDocument()
    expect(queryByText(/italian/i)).toBeNull()
  })

  it('value equals first item', () => {
    const { getByLabelText } = render(
      <Select id="language" label="Language" items={languages} />
    )
    expect(getByLabelText(/language/i).value).toEqual(languages[0].name)
  })

  it('shows menu when focussed', () => {
    const { getByLabelText, getByText } = render(
      <Select id="language" label="Language" items={languages} />
    )
    fireEvent.focus(getByLabelText(/language/i))
    expect(getByText(/italian/i)).toBeInTheDocument()
  })

  it('handles a passed initial value correctly', () => {
    const { getByLabelText } = render(
      <Select
        id="language"
        label="Language"
        items={languages}
        initialSelectedItem={languages[1]}
      />
    )
    expect(getByLabelText(/language/i).value).toEqual(languages[1].name)
  })

  it('calls onChange handler correctly and closes menu on item click', () => {
    const handler = jest.fn()
    const { getByText, getByLabelText, queryByText } = render(
      <Select
        id="language"
        label="Language"
        items={languages}
        onChange={selection => handler(selection)}
      />
    )
    fireEvent.focus(getByLabelText(/language/i))
    fireEvent.mouseDown(getByText(/dutch/i))
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(languages[2])
    expect(queryByText(/italian/i)).toBeNull()
  })
})
