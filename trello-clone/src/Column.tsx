import React from 'react'
import { ColumnContainer, ColumnTitle, AddItemButton } from './styles'

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
    </ColumnContainer>
  )
}
