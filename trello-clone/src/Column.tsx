import React, { useContext } from 'react'
import { AddNewItem } from './AddNewItem'
import { useAppState } from './AppStateContext'
import { ColumnContainer, ColumnTitle } from './styles'

interface IColumnProps {
  id: string
  text?: string
}

export const Column = ({
  text,
  id,
  children,
}: React.PropsWithChildren<IColumnProps>) => {
  const { dispatch } = useAppState()
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => {
          dispatch({ type: 'ADD_TASK', payload: { text, taskId: id } })
        }}
      ></AddNewItem>
    </ColumnContainer>
  )
}
