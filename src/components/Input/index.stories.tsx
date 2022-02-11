import { useEffect, useState } from 'react'
import { CloseRounded, MagnifyingGlass } from '../../icons'
import { color } from '../../theme'
import { Spinner } from '../Spinner'
import { Input, InputWithLabel } from './'

export default {
  title: 'Components/Inputs/Input',
}

export const Basic = () => (
  <Input
    maxLength={10}
    id="email"
    aria-label="Enter your e-mail here"
    placeholder="E-mail"
    onChange={console.log}
  />
)

export const WithLabel = () => (
  <InputWithLabel
    maxLength={10}
    id="email"
    label="Enter your e-mail here"
    placeholder="E-mail"
    onChange={console.log}
  />
)

export const WithStartAdornment = () => (
  <InputWithLabel
    maxLength={10}
    id="search"
    label="Search here"
    placeholder="Search.."
    startAdornment={<MagnifyingGlass size={24} color={color.spaceMedium} />}
    onChange={console.log}
  />
)

export const WithEndAdornment = () => (
  <InputWithLabel
    maxLength={10}
    id="search"
    label="Search here"
    placeholder="Search.."
    endAdornment={<CloseRounded size={24} color={color.spaceMedium} />}
    onChange={console.log}
  />
)

export const WithAdornments = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [query])

  return (
    <InputWithLabel
      maxLength={10}
      id="search"
      label="Search here"
      placeholder="Search.."
      startAdornment={<MagnifyingGlass size={24} color={color.spaceMedium} />}
      endAdornment={
        loading ? <Spinner size={24} /> : <CloseRounded size={24} color={color.spaceMedium} />
      }
      value={query}
      onChange={event => {
        setQuery(event.target.value)
        setLoading(true)
      }}
    />
  )
}

export const Disabled = () => (
  <InputWithLabel maxLength={10} id="search" label="Search here" disabled onChange={console.log} />
)

export const Rounded = () => (
  <InputWithLabel
    startAdornment={<MagnifyingGlass size={24} color={color.spaceMedium} />}
    maxLength={10}
    id="search"
    label="Search here"
    rounded
    onChange={console.log}
  />
)
