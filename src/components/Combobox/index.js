import React from 'react'
import styled from '@emotion/styled'
import { useId } from '@reach/auto-id'
import computeScrollIntoView from 'compute-scroll-into-view'
import {
  space,
  radius,
  shadow,
  color,
  fontWeight,
  transition,
} from '../../theme'
import { callAll } from '../../utils'
import { useKeyPress } from '../../hooks'
import { Adornment } from '../Input'

export const ComboboxMenu = styled.div`
  text-align: left;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: calc(100% + ${space[4]});
  border-radius: ${radius.md};
  background-color: white;
  box-shadow: ${shadow.strong};
  overflow: hidden;
`

export const ComboboxList = styled.ul`
  max-height: ${space[256]};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-left: ${props => (props.adornment ? space[48] : space[16])};
  padding-right: ${space[16]};
  min-height: ${space[56]};
  background-color: ${props => (props.highlighted ? color.stardust : 'white')};
  font-weight: ${props =>
    props.selected ? fontWeight.semiBold : fontWeight.regular};
  color: ${props => (props.selected ? color.earth : props.space)};
  cursor: pointer;
  transition: color ${transition};

  & + ${() => ItemContainer} {
    border-top: 1px solid ${color.spaceLightest};
  }
`

export const ComboboxItem = React.forwardRef(({ children, ...props }, ref) => (
  <ItemContainer {...props} ref={ref}>
    {props.adornment && <Adornment left>{props.adornment}</Adornment>}
    {children}
  </ItemContainer>
))

export function useCombobox({ onSelect, itemKey }) {
  const listboxId = `listbox:${useId()}`
  const [inputValue, setInputValue] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState('')
  const [highlightedItem, setHighlightedItem] = React.useState('')
  const [on, setOn] = React.useState(false)
  const arrowUp = useKeyPress('ArrowUp')
  const arrowDown = useKeyPress('ArrowDown')
  const inputRef = React.useRef()
  const menuRef = React.useRef()
  const itemRefs = React.useRef([])

  function setItemRef(el) {
    if (!el || itemRefs.current.includes(el)) return false
    return itemRefs.current.push(el)
  }

  // WEIRD? Reset the options ref every time `inputValue` changes so that they
  // are always accurate and ready for keyboard navigation handlers. Using
  // layout effect to schedule this effect before the options push into the
  // array.
  React.useLayoutEffect(() => {
    itemRefs.current = []
    return () => (itemRefs.current = [])
  }, [inputValue])

  // Open menu when `inputValue` changes
  React.useEffect(() => {
    setOn(true)
  }, [inputValue])

  function scrollIntoView(node, menuNode) {
    if (!node) return false
    const actions = computeScrollIntoView(node, {
      boundary: menuNode,
      block: 'nearest',
      scrollMode: 'if-needed',
    })
    actions.forEach(({ el, top, left }) => {
      el.scrollTop = top
      el.scrollLeft = left
    })
  }

  const scrollHighlightedItemIntoView = React.useCallback(() => {
    const items = itemRefs.current
    const node = items.filter(i => i && i.id === highlightedItem)[0] || null
    scrollIntoView(node, menuRef)
  }, [highlightedItem, itemRefs])

  React.useEffect(() => {
    if (arrowUp || arrowDown) {
      scrollHighlightedItemIntoView()
    }
  }, [arrowUp, arrowDown, scrollHighlightedItemIntoView])

  function handleBlur(blurAfterSelect = false) {
    requestAnimationFrame(() => {
      // Close after selection and exit early
      if (blurAfterSelect) {
        return on && setOn(false)
      }
      // We only want to close only if focus rests outside the combobox
      if (document.activeElement !== inputRef.current && menuRef.current) {
        if (menuRef.current.contains(document.activeElement)) {
          // Focus landed inside the combobox, keep it open
          !on && setOn(true)
        } else {
          // Focus landed outside the combobox, close it.
          on && setOn(false)
        }
      }
    })
  }

  function getContainerProps(props = {}) {
    return {
      role: 'combobox',
      'aria-haspopup': 'listbox',
      'aria-owns': listboxId,
      'aria-expanded': Boolean(on),
      ...props,
      onKeyDown: e => {
        if (!on) return false
        const highlightedIndex = itemRefs.current.indexOf(
          itemRefs.current.find(i => i.id === highlightedItem) || 0
        )
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          if (itemRefs.current.length < 2) return false
          const prev = itemRefs.current[highlightedIndex - 1]
          const last = itemRefs.current[itemRefs.current.length - 1]
          setHighlightedItem(
            highlightedIndex === 0 ? last && last.id : prev && prev.id
          )
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          if (itemRefs.current.length < 2) return false
          const next = itemRefs.current[highlightedIndex + 1]
          const first = itemRefs.current[0]
          setHighlightedItem(
            highlightedIndex === itemRefs.current.length - 1
              ? first && first.id
              : next && next.id
          )
        }
        // Select with Enter
        if (e.key === 'Enter') {
          const item = itemRefs.current[highlightedIndex]
          if (!item) return false
          const selection = JSON.parse(item.getAttribute('value'))
          setInputValue(selection[itemKey])
          setSelectedItem(item.getAttribute('id').toString())
          onSelect(selection)
          handleBlur(true)
        }
        // Blur with Esc
        if (e.key === 'Escape') {
          handleBlur(true)
        }
      },
    }
  }

  function getInputProps(props = {}) {
    const handleFocus = () => setOn(true)
    const handleChange = e => setInputValue(e.target.value)

    return {
      ...props,
      value: inputValue,
      onBlur: callAll(props.onBlur, handleBlur),
      onFocus: callAll(props.onFocus, handleFocus),
      onChange: callAll(props.onChange, handleChange),
      id: listboxId,
      ref: inputRef,
      'aria-autocomplete': 'both',
      'aria-activedescendant': highlightedItem
        ? makeHash(highlightedItem)
        : undefined,
    }
  }

  function getMenuProps(props = {}) {
    // Instead of conditionally rendering the popover we use the `hidden` prop
    // because we don't want to unmount on close (from escape or onSelect).  If
    // we unmounted, then we'd lose the optionsRef and the user wouldn't be able
    // to use the arrow keys to pop the list back open. However, the developer
    // can conditionally render the ComboboxPopover if they do want to cause
    // mount/unmount based on the app's own data (like results.length or
    // whatever).
    const hidden = !on

    return {
      ...props,
      value: inputValue,
      hidden,
      id: listboxId,
      'aria-autocomplete': 'both',
      ref: menuRef,
      onBlur: callAll(props.onBlur, handleBlur),
      // Allow the user to click empty space inside the popover without causing
      // to close from useBlur
      tabIndex: '-1',
    }
  }

  function getListProps(props = {}) {
    return {
      ...props,
      role: 'listbox',
    }
  }

  function getItemProps(props = {}) {
    const id = makeHash(props.value).toString()
    const handleMouseMove = () => setHighlightedItem(id)
    const handleMouseDown = () => {
      const selection = JSON.parse(props.value)
      setInputValue(selection[itemKey])
      setSelectedItem(id)
      onSelect(selection)
      handleBlur(true)
    }

    return {
      ...props,
      ref: setItemRef,
      id,
      'aria-selected': id === highlightedItem,
      highlighted: id === highlightedItem,
      selected: id === selectedItem,
      onMouseMove: callAll(props.onMouseMove, handleMouseMove),
      onMouseDown: callAll(props.onMouseDown, handleMouseDown),
      role: 'option',
      // without this the menu will close from `onBlur`, but with it the
      // element can be `document.activeElement` and then our focus checks in
      // onBlur will work as intended
      tabIndex: '-1',
    }
  }

  return {
    getContainerProps,
    getInputProps,
    getMenuProps,
    getListProps,
    getItemProps,
  }
}

// We don't want to track the active descendant with indexes because nothing is
// more annoying in a combobox than having it change values RIGHT AS YOU HIT
// ENTER. That only happens if you use the index as your data, rather than
// *your data as your data*. We use this to generate a unique ID based on the
// value of each item. This function is short, sweet, and good enough™ (I also
// don't know how it works, tbqh)
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
const makeHash = str => {
  let hash = 0
  if (str.length === 0) {
    return hash
  }
  for (let i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}
