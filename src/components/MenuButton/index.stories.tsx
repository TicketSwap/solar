import React from 'react'
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from './'

export default {
  title: 'Components/Navigation/MenuButton',
}

export const Basic = () => (
  <Menu>
    <MenuButton>
      Actions <span aria-hidden>▾</span>
    </MenuButton>
    <MenuList>
      <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
      <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
      <MenuItem onSelect={() => alert('Mark as Draft')}>Mark as Draft</MenuItem>
      <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
      <MenuLink as="a" href="https://ticketswap.com/">
        Visit TicketSwap
      </MenuLink>
    </MenuList>
  </Menu>
)

export const Top = () => (
  <div style={{ marginTop: '80vh' }}>
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
        <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
        <MenuItem onSelect={() => alert('Mark as Draft')}>
          Mark as Draft
        </MenuItem>
        <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
        <MenuLink as="a" href="https://ticketswap.com/">
          Visit TicketSwap
        </MenuLink>
      </MenuList>
    </Menu>
  </div>
)
