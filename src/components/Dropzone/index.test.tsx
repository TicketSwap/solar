import React from 'react'
import {
  render,
  screen,
  createFileForDataTransfer,
  fireEvent,
  flushPromises,
  waitFor,
  createDataTransferWithFiles,
} from '../../../test/test.utils'
import { Dropzone } from '.'

const dropzoneRendered = async () =>
  await screen.findByText('Upload PDF or Apple Wallet tickets')

const isDraggingFile = async () => screen.findByText('Release')

describe('Dropzone', () => {
  it('renders the details', async () => {
    render(
      <Dropzone
        title="Upload PDF or Apple Wallet tickets"
        subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
        action="Drop files here or click here to select"
        dropTitle="Release"
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

  describe('when a file is dropped', () => {
    it('calls onFileChange with the file', async () => {
      const onFileChange = jest.fn()

      const ui = (
        <Dropzone
          title="Upload PDF or Apple Wallet tickets"
          subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
          action="Drop files here or click here to select"
          dropTitle="Release"
          onFileChange={onFileChange}
        />
      )

      const { rerender } = render(ui)

      await dropzoneRendered()

      const files = [
        createFileForDataTransfer('ticket.pdf', 8, 'application/pdf'),
      ]

      const dataTransfer = createDataTransferWithFiles(files)

      const dropArea = screen.getByTestId('droparea')
      const dropOverlay = screen.getByTestId('dropoverlay')

      fireEvent.dragEnter(dropArea, dataTransfer)

      await flushPromises(rerender, ui)

      await isDraggingFile()

      fireEvent.drop(dropOverlay, dataTransfer)

      await flushPromises(rerender, ui)

      await waitFor(() => expect(onFileChange).toHaveBeenCalled())

      expect(onFileChange).toHaveBeenCalledWith(files[0])
    })

    describe('and it does not have an accepted file type', () => {
      it('calls onUnacceptedFileChange', async () => {
        const onFileChange = jest.fn()
        const onUnacceptedFileChange = jest.fn()

        const ui = (
          <Dropzone
            title="Upload PDF or Apple Wallet tickets"
            subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
            action="Drop files here or click here to select"
            dropTitle="Release"
            accept={['.pdf']}
            onFileChange={onFileChange}
            onUnacceptedFileChange={onUnacceptedFileChange}
          />
        )

        const { rerender } = render(ui)

        await dropzoneRendered()

        const files = createDataTransferWithFiles([
          createFileForDataTransfer('ticket.png', 8, 'image/png'),
        ])

        const dropArea = screen.getByTestId('droparea')
        const dropOverlay = screen.getByTestId('dropoverlay')

        fireEvent.dragEnter(dropArea, files)

        await flushPromises(rerender, ui)

        await isDraggingFile()

        fireEvent.drop(dropOverlay, files)

        await flushPromises(rerender, ui)

        await waitFor(() => expect(onUnacceptedFileChange).toHaveBeenCalled())
        expect(onFileChange).not.toHaveBeenCalled()
      })
    })
  })

  describe('when multiple files are dropped', () => {
    it('calls onFileChange with the files', async () => {
      const onFileChange = jest.fn()

      const ui = (
        <Dropzone
          title="Upload PDF or Apple Wallet tickets"
          subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
          action="Drop files here or click here to select"
          dropTitle="Release"
          multiple
          onFileChange={onFileChange}
        />
      )

      const { rerender } = render(ui)

      await dropzoneRendered()

      const files = [
        createFileForDataTransfer('ticket.pdf', 8, 'application/pdf'),
        createFileForDataTransfer('ticket2.pdf', 8, 'application/pdf'),
      ]

      const dataTransfer = createDataTransferWithFiles(files)

      const dropArea = screen.getByTestId('droparea')
      const dropOverlay = screen.getByTestId('dropoverlay')

      fireEvent.dragEnter(dropArea, dataTransfer)

      await flushPromises(rerender, ui)

      await isDraggingFile()

      fireEvent.drop(dropOverlay, dataTransfer)

      await flushPromises(rerender, ui)

      await waitFor(() => expect(onFileChange).toHaveBeenCalled())

      expect(onFileChange).toHaveBeenCalledWith(files)
    })
  })

  describe('when a file is selected', () => {
    it('calls onFileChange with the file', async () => {
      const onFileChange = jest.fn()

      const ui = (
        <Dropzone
          title="Upload PDF or Apple Wallet tickets"
          subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
          action="Drop files here or click here to select"
          dropTitle="Release"
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

  describe('when multiple files are selected', () => {
    it('calls onFileChange with the files', async () => {
      const onFileChange = jest.fn()

      const ui = (
        <Dropzone
          title="Upload PDF or Apple Wallet tickets"
          subtitle="If your original file contains multiple tickets make sure to upload all of them, and we will let you select the ones you want to sell."
          action="Drop files here or click here to select"
          dropTitle="Release"
          ariaLabel="tickets upload"
          multiple
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

      const files = [file, file]

      fireEvent.change(fileInput, { target: { files: files } })

      await flushPromises(rerender, ui)

      await waitFor(() => expect(onFileChange).toHaveBeenCalled())

      expect(onFileChange).toHaveBeenCalledWith(files)
    })
  })
})
