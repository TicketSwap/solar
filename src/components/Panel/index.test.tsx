import React from 'react'
import { render } from '../../../test/test.utils'
import { Panel, PanelContent, PanelText, PanelBody } from '.'

describe('Panel', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(
      <Panel>
        <PanelContent>
          <PanelBody>
            <PanelText>Lorem ipsum dolor sit amet</PanelText>
          </PanelBody>
        </PanelContent>
      </Panel>
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument()
  })
})
