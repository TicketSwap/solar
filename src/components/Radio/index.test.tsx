import React, { createRef } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio } from './'

describe('Radio', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Radio onChange={() => null} value="on" checked id="test" name="test" />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  describe('on click', () => {
    it('fires an on change event when not checked before', () => {
      const handleChange = jest.fn(event => event.target.value)
      const valueMock = 'test'
      const ref = createRef<HTMLInputElement>()

      render(
        <Radio
          ref={ref}
          onChange={handleChange}
          value={valueMock}
          checked={false}
          id="test"
          name="test"
        />
      )

      userEvent.click(ref.current)

      expect(handleChange).toBeCalledTimes(1)
      expect(handleChange.mock.results[0].value).toBe(valueMock)
    })

    it('does not fire an on change event when already checked', () => {
      const handleChange = jest.fn(event => event.target.value)
      const ref = createRef<HTMLInputElement>()

      render(
        <Radio
          ref={ref}
          onChange={handleChange}
          value="test"
          checked={true}
          id="test"
          name="test"
        />
      )

      userEvent.click(ref.current)

      expect(handleChange).toBeCalledTimes(0)
    })

    it('does not fire an on change event when disabled', () => {
      const handleChange = jest.fn(event => event.target.value)
      const ref = createRef<HTMLInputElement>()

      render(
        <Radio
          ref={ref}
          onChange={handleChange}
          value="test"
          checked={false}
          id="test"
          name="test"
          disabled
        />
      )

      userEvent.click(ref.current)

      expect(handleChange).toBeCalledTimes(0)
    })
  })
})
