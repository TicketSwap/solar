import React, { ReactNode, Ref, useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Spinner } from '../Spinner'
import { VisuallyHidden } from '../VisuallyHidden'
import {
  color,
  space,
  shadow,
  transition,
  fontSize,
  lineHeight,
  radius,
  device,
  fontWeight,
} from '../../theme'
import { CloseRounded } from '../../icons'

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string
  name?: string
  autocomplete?: string
  label: string
  hideLabel?: boolean
  loading?: boolean
  labelProps?: object
  leftAdornment?: ReactNode
  rightAdornment?: ReactNode
  value?: number | string
  type?: string
  step?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  menu?: boolean | object
  validate?: boolean
  onReset?: () => void
  placeholder?: string
  help?: string
  rounded?: boolean
  as?: React.ElementType
  rows?: string
  ref?: Ref<HTMLInputElement>
  disabled?: boolean
  invalid?: boolean
  isLoading?: boolean
}

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const fieldStyles = (props: InputProps) => css`
  font-family: inherit;
  background-color: ${props.invalid
    ? color.failureBackground
    : color.elevatedBackground};
  border-radius: ${props.rounded ? space[32] : radius.md};
  inline-size: 100%;
  font-size: ${fontSize[18]};
  line-height: ${props.as === 'textarea' ? lineHeight.copy : lineHeight.solid};
  block-size: ${props.as === 'textarea' ? 'auto' : space[56]};
  padding-block-start: ${props.as === 'textarea' ? space[12] : 0};
  padding-block-end: ${props.as === 'textarea' ? space[12] : 0};
  padding-inline-start: ${props.leftAdornment ? space[48] : space[16]};
  padding-inline-end: ${(typeof props.value === 'string' &&
    props.value.length &&
    props.onReset) ||
  props.isLoading ||
  props.rightAdornment
    ? space[48]
    : space[16]};
  color: ${color.foreground};
  box-shadow: none;
  border: 0;
  text-align: start;
  appearance: none;
  transition:
    box-shadow ${transition},
    background-color ${transition};
  -webkit-font-smoothing: auto;

  ${props.as === 'textarea' &&
  css`
    resize: vertical;
    min-block-size: ${space[96]};
  `};

  &[type='search']::-webkit-search-decoration {
    appearance: none;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button,
  &[type='time']::-webkit-inner-spin-button,
  &[type='date']::-webkit-clear-button,
  &[type='date']::-webkit-inner-spin-button,
  &[type='date']::-webkit-calendar-picker-indicator {
    appearance: none;
    display: none;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus,
  &.focus {
    outline: none;
    background-color: ${props.invalid
      ? color.failureBackground
      : color.elevatedBackground};
    box-shadow: 0 0 0 ${space[4]}
      ${props.invalid ? color.failureFocus : color.actionFocus};
  }

  &::placeholder {
    color: ${color.foregroundSubtle};
  }

  &.invalid {
    color: ${color.failure} !important;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`

const Field = styled.input`
  ${fieldStyles};
`

export const Label = styled.label`
  position: relative;
  display: block;
`

export const LabelText = styled.span`
  display: inline-block;
  color: ${color.foreground};
  margin-block-end: ${space[4]};
`

type AdornmentProps = {
  left?: boolean
  right?: boolean
}

export const Adornment = styled.span<AdornmentProps>`
  position: absolute;
  color: ${color.foregroundMuted};
  inset-inline-start: ${props => (props.left ? 0 : 'auto')};
  inset-inline-end: ${props => (props.right ? 0 : 'auto')};
  inset-block: 0;
  inline-size: ${space[48]};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: color ${transition};

  ${Label}:focus-within & {
    color: ${color.foreground};
  }
`

const ResetButton = styled.button`
  line-height: 0;
  opacity: 0.35;
  transition: opacity ${transition};

  &:hover,
  &:focus {
    opacity: 0.5;
    outline: 0;
  }
`

export const Help = styled.p`
  font-size: ${fontSize[14]};
  margin-block-end: 0;
  margin-block-start: ${6 / 16}rem;
  color: ${color.foregroundMuted};

  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`

export const InputMenuFooter = styled.footer`
  text-align: end;
  padding-block: ${space[4]};
  padding-inline: ${space[16]};
  border-block-start: 1px solid ${color.stroke};
`

export const InputMenuList = styled.ul`
  max-block-size: ${space[256]};
  margin-block: 0;
  margin-inline: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-block: 0;
  padding-inline: 0;
`

export interface InputMenuItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  adornment?: ReactNode
  highlighted?: boolean
  selected?: boolean
}

const InputMenuItemContainer = styled.li<InputMenuItemProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-inline-start: ${props => (props.adornment ? space[48] : space[16])};
  padding-inline-end: ${space[16]};
  min-block-size: ${space[56]};
  background-color: ${props =>
    props.highlighted ? color.elevatedBackground : color.background};
  font-weight: ${props =>
    props.selected ? fontWeight.semiBold : fontWeight.regular};
  color: ${props => (props.selected ? color.action : color.foreground)};
  cursor: pointer;
  transition: color ${transition};
  margin-block: 0;
  margin-inline: 0;

  :not(:first-of-type) {
    border-block-start: 1px solid ${color.stroke};
  }
`

export const InputMenu = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  text-align: start;
  position: absolute;
  inset-inline: 0;
  inset-block-start: calc(100% + ${space[4]});
  border-radius: ${radius.md};
  background-color: ${color.background};
  box-shadow: ${shadow.strong};
  overflow: hidden;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    border: 1px solid ${color.stroke};
  }
`

export interface InputMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOutsideViewport?: boolean
}

export interface StyledSelectMenuProps extends InputMenuProps {
  heightOfMenu: number
  isOpen: boolean
}

const StyledSelectMenu = styled(InputMenu)<StyledSelectMenuProps>`
  inset-block-start: ${props =>
    props.isOutsideViewport
      ? `-${props.heightOfMenu + 4}px`
      : 'calc(100% + 4px)'};
  opacity: ${props => (props.isOpen ? 1 : 0)};
`

export const SelectMenu = ({ children, ...props }: InputMenuProps) => {
  const [height, setHeight] = useState(0)
  const [isOutsideViewport, setIsOutsideViewport] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeight(ref?.current?.clientHeight || 0)
  }, [setHeight])

  useEffect(() => {
    setIsOpen(true)
  }, [setIsOpen])

  useEffect(() => {
    const bottom = ref?.current?.getBoundingClientRect()?.bottom || 0
    const viewportHeight = window?.innerHeight || 0

    if (bottom > viewportHeight) {
      setIsOutsideViewport(true)
    } else {
      setIsOutsideViewport(false)
    }
  }, [setIsOutsideViewport, setIsOpen])

  return (
    <StyledSelectMenu
      {...props}
      isOutsideViewport={isOutsideViewport}
      ref={ref}
      heightOfMenu={height}
      isOpen={isOpen}
    >
      {children}
    </StyledSelectMenu>
  )
}

export const InputMenuItem = React.forwardRef(
  (
    { children, ...props }: InputMenuItemProps,
    ref: React.Ref<HTMLLIElement>
  ) => (
    <InputMenuItemContainer {...props} ref={ref}>
      {props.adornment && <Adornment left>{props.adornment}</Adornment>}
      {children}
    </InputMenuItemContainer>
  )
)

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      hideLabel,
      labelProps,
      validate,
      loading,
      name,
      autocomplete,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const invalid = typeof validate === 'undefined' ? false : !validate
    const isControlled = typeof props.value !== 'undefined'

    const value = isControlled
      ? props.value // @ts-ignore
      : ref && ref.current // @ts-ignore
      ? ref.current.value
      : ''

    const showResetButton = props.onReset && value.toString().length > 0

    return (
      <Label htmlFor={!labelProps ? id : undefined} {...labelProps}>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelText>{label}</LabelText>
          </VisuallyHidden>
        ) : (
          <LabelText>{label}</LabelText>
        )}
        <InputWrapper>
          <>
            {props.leftAdornment ? (
              <Adornment left>{props.leftAdornment}</Adornment>
            ) : null}
            <Field
              ref={ref}
              id={id}
              invalid={invalid}
              isLoading={loading}
              disabled={disabled}
              label={label}
              name={name}
              autocomplete={autocomplete}
              {...props}
            />
            {loading ? (
              <Adornment right>
                <Spinner size={24} />
              </Adornment>
            ) : showResetButton ? (
              <Adornment right>
                <ResetButton
                  onClick={props.onReset}
                  type="button"
                  data-testid="reset-button"
                >
                  <CloseRounded size={16} />
                </ResetButton>
              </Adornment>
            ) : props.rightAdornment ? (
              <Adornment right>{props.rightAdornment}</Adornment>
            ) : null}
            {props.menu && props.menu}
          </>
        </InputWrapper>
        {props.help && <Help>{props.help}</Help>}
      </Label>
    )
  }
)
