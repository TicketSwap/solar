import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const customRender = (ui, options) => ({
  user: userEvent.setup({
    delay: null,
  }),
  ...render(ui, {
    ...options,
  }),
})

export * from '@testing-library/react'

export { customRender as render, userEvent }
