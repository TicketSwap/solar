import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  Ref,
  useId,
} from 'react'
import { color, fontWeight, radius, shadow, space } from '../../theme'
import { OptionProps, SelectVariant } from './Select'

interface WrapperProps {
  $open: boolean
}

const Wrapper = styled.div<WrapperProps>`
  border-radius: ${radius.md};
  overflow: auto;
  opacity: 0;
  position: absolute;
  inset-inline-start: 0;
  min-inline-size: 100%;
  inset-block-start: ${space[56]};
  pointer-events: none;
  box-shadow: ${shadow.strong};
  z-index: 1;
  max-block-size: ${space[256]};
  user-select: none;

  &:focus {
    outline: none;
  }

  ${props =>
    props.$open &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`

interface ListBoxOptionProps {
  $hasStartAdornment: boolean
}

const ListboxOption = styled.div<ListBoxOptionProps>`
  cursor: default;
  padding-block: var(--_listBoxOptionPaddingBlock, ${space[16]});
  padding-inline: var(--_listBoxOptionPaddingInline, ${space[16]});
  background-color: var(--_listBoxOptionBackground, ${color.background});
  border-block-start: 1px solid var(--_listBoxOptionStroke, ${color.stroke});
  white-space: nowrap;
  align-items: center;

  &:first-of-type {
    border-block-start: 0;
  }

  &[data-focussed='true'] {
    background-color: var(
      --listBoxOptionFocussedBackground,
      ${color.actionBackground}
    );
  }

  &[aria-selected='true'] {
    color: var(--_listBoxOptionSelectedBackground, ${color.action});
    font-weight: ${fontWeight.semiBold};
  }

  ${props =>
    props.$hasStartAdornment &&
    css`
      display: grid;
      grid-template-columns: auto 1fr;
      gap: ${space[8]};
    `}
`

interface ListboxProps {
  options: OptionProps[]
  selected?: string | number | readonly string[]
  focussed: number | null
  open: boolean
  'aria-label': string
  onBlur: (event: FocusEvent<HTMLDivElement>) => void
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void
  onHover: (index: number) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onClick: (event: MouseEvent<HTMLDivElement>) => void
  variant: SelectVariant
}

export const Listbox = forwardRef(
  (
    {
      options,
      selected,
      focussed,
      'aria-label': ariaLabel,
      open,
      onBlur,
      onFocus,
      onHover,
      onKeyDown,
      onClick,
      variant,
      ...props
    }: ListboxProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const id = useId()
    const activeDescendant = options.find(
      (_option, index) => index === focussed
    )

    return (
      <Wrapper
        ref={ref}
        role="listbox"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-activedescendant={activeDescendant?.id ?? `${id}-${focussed}`}
        $open={open}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
      >
        {options.map((option, index) => (
          <ListboxOption
            key={
              option.id ??
              `${id}-${option.value?.toString().replace(/[^a-z0-9]/gi, '-')}` ??
              index
            }
            role="option"
            id={option.id ?? `${id}-${index}`}
            aria-selected={option.value === selected}
            data-focussed={index === focussed}
            data-value={option.value}
            onMouseMove={() => {
              if (index !== focussed) {
                onHover(index)
              }
            }}
            $hasStartAdornment={Boolean(option.startAdornment)}
          >
            {variant !== 'short' && option.startAdornment}{' '}
            {option.label || option.value}
          </ListboxOption>
        ))}
      </Wrapper>
    )
  }
)
