import React from 'react'
import { render } from '../../../test/test.utils'
import { Menu, MenuButton, MenuItem, MenuLink, MenuList } from './'

const handleOnSelect = jest.fn()
const MyMenuButton = () => (
  <Menu>
    <MenuButton>
      Actions <span aria-hidden>▾</span>
    </MenuButton>
    <MenuList>
      <MenuItem onSelect={() => handleOnSelect('Download')}>Download</MenuItem>
      <MenuItem onSelect={() => handleOnSelect('Copy')}>Create a Copy</MenuItem>
      <MenuItem onSelect={() => handleOnSelect('Mark as Draft')}>
        Mark as Draft
      </MenuItem>
      <MenuItem onSelect={() => handleOnSelect('Delete')}>Delete</MenuItem>
      <MenuLink as="a" href="https://ticketswap.com/">
        Visit TicketSwap
      </MenuLink>
    </MenuList>
  </Menu>
)

describe('MenuButton', () => {
  it('renders without crashing', () => {
    const { container } = render(<MyMenuButton />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
