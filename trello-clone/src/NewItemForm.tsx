import { useState } from 'react'
import { NewItemButton, NewItemFormContainer, NewItemInput } from './styles'

interface NewItemFormProps {
  onAdd: (text: string) => void
}

export const NewItemForm = (props: NewItemFormProps) => {
  const [inputText, setInputText] = useState('')
  const { onAdd } = props

  return (
    <NewItemFormContainer>
      <NewItemInput value={inputText} onChange={e => setInputText(e.target.value)}></NewItemInput>
      <NewItemButton onClick={() => onAdd(inputText)}>Create</NewItemButton>
    </NewItemFormContainer>
  )
}
