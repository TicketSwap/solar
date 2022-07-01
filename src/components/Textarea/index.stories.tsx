import { Instruction } from '../Instruction'
import { Textarea } from './'

export default {
  title: 'Components/Inputs/Textarea',
}

export const Basic = () => <Textarea id="basic" aria-label="My textarea" />

export const WithLabel = () => <Textarea id="textarea" label="My textarea" />

export const WithInstruction = () => (
  <Textarea
    id="textarea"
    label="About me"
    instruction={<Instruction>Tell us something about you</Instruction>}
  />
)
