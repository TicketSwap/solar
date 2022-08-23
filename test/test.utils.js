import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

export const createFileForDataTransfer = (name, size, type) => {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size * 1024 ** 2
    },
  })
  return file
}

export const createDataTransferWithFiles = (files = []) => {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        kind: 'file',
        size: file.size,
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  }
}

export const flushPromises = async (rerender, ui) => {
  await act(() => waitFor(() => rerender(ui)))
}

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
