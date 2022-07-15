import { useEffect, useState } from 'react'
import { CloseRounded, MagnifyingGlass } from '../../icons'
import { color } from '../../theme'
import { Spinner } from '../Spinner'
import { Input } from '.'

export default {
  title: 'Components/Inputs/InputV2',
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
  <Input
    maxLength={10}
    id="email"
    label="Enter your e-mail here"
    placeholder="E-mail"
    onChange={console.log}
  />
)

export const WithStartAdornment = () => (
  <Input
    maxLength={10}
    id="search"
    label="Search here"
    placeholder="Search.."
    startAdornment={<MagnifyingGlass size={24} color={color.foreground} />}
    onChange={console.log}
  />
)

export const WithEndAdornment = () => (
  <Input
    maxLength={10}
    id="search"
    label="Search here"
    placeholder="Search.."
    endAdornment={<CloseRounded size={24} color={color.foreground} />}
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
    <Input
      maxLength={10}
      id="search"
      label="Search here"
      placeholder="Search.."
      startAdornment={<MagnifyingGlass size={24} color={color.foreground} />}
      endAdornment={
        loading ? <Spinner size={24} /> : <CloseRounded size={24} color={color.foreground} />
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
  <>
    <Input maxLength={10} id="search" label="Search here" disabled onChange={console.log} />
  </>
)

export const Rounded = () => (
  <Input
    startAdornment={<MagnifyingGlass size={24} color={color.foreground} />}
    maxLength={10}
    id="search"
    label="Search here"
    rounded
    onChange={console.log}
  />
)

export const Time = () => <Input type="time" id="time" label="Select time" onChange={console.log} />
