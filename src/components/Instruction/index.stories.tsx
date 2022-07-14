import { Instruction } from './'

export default {
  title: 'Components/Inputs/Instruction',
}

export const Basic = () => <Instruction>This is an instruction</Instruction>

export const Danger = () => (
  <Instruction variant="danger">This is an instruction</Instruction>
)

export const Warning = () => (
  <Instruction variant="warning">This is an instruction</Instruction>
)

export const Succcess = () => (
  <Instruction variant="success">This is an instruction</Instruction>
)
