import React from 'react'
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
    </ColumnContainer>
  )
}
