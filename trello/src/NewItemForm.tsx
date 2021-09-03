import { useState } from 'react'
import { NewItemButton, NewItemFormContainer, NewItemInput } from './styles'
import { useFocus } from './utils/useFocus'

interface NewItemFormProps {
  onAdd: (text: string) => void
}

export const NewItemForm = (props: NewItemFormProps) => {
  const [inputText, setInputText] = useState('')
  const { onAdd } = props
  const inputRef = useFocus()

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></NewItemInput>
      <NewItemButton onClick={() => onAdd(inputText)}>Create</NewItemButton>
    </NewItemFormContainer>
  )
}
