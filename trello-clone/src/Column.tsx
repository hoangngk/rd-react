import React from 'react'
import { AddNewItem } from './AddNewItem'
import { ColumnContainer, ColumnTitle } from './styles'

interface IColumnProps {
  text?: string
}

export const Column = ({
  text,
  children,
}: React.PropsWithChildren<IColumnProps>) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        dark
        toggleButtonText="+ Add another task"
        onAdd={() => {}}
      ></AddNewItem>
    </ColumnContainer>
  )
}
