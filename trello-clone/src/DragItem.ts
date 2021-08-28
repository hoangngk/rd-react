export type ColumnDragItem = {
  id: string
  text: string
  type: 'COLUMN'
  index: number
}

export type CardDragItem = {
  id: string
  text: string
  type: 'CARD'
  index: number
  columnId: string
}

export type DragItem = ColumnDragItem | CardDragItem
