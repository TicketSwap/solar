import React from 'react'
import {
  render,
  screen,
  fireEvent,
  flushPromises,
  waitFor,
} from '../../../test/test.utils'
import { Dropzone } from '.'

const dropzoneRendered = async () =>
  await screen.findByText('Upload PDF or Apple Wallet tickets')

describe('Dropzone', () => {
  it('renders the details', async () => {
    render(
      <Dropzone
        title="Upload PDF or Apple Wallet tickets"
        subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
        action="Drop files here or click here to select"
        onFileChange={() => {}}
      />
    )

    await dropzoneRendered()

    expect(
      screen.getByText('Upload PDF or Apple Wallet tickets')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell.'
      )
    ).toBeInTheDocument()
  })

  describe('when a file is selected', () => {
    it('calls onFileChange with the file', async () => {
      const onFileChange = jest.fn()

      const ui = (
        <Dropzone
          title="Upload PDF or Apple Wallet tickets"
          subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
          action="Drop files here or click here to select"
          ariaLabel="tickets upload"
          onFileChange={onFileChange}
        />
      )

      const { rerender } = render(ui)

      await dropzoneRendered()

      const fileInput = screen.getByLabelText('tickets upload', {
        selector: 'input',
      })

      const file = new File(['Amazing Festival'], 'amazing-festival.pdf', {
        type: 'application/pdf',
      })

      fireEvent.change(fileInput, { target: { files: [file] } })

      await flushPromises(rerender, ui)

      await waitFor(() => expect(onFileChange).toHaveBeenCalled())

      expect(onFileChange).toHaveBeenCalledWith(file)
    })
  })
})
