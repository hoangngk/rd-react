import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { AddNewItem } from './AddNewItem'
import { useAppState } from './AppStateContext'
import { Card } from './Card'
import { DragItem } from './DragItem'
import { ColumnContainer, ColumnTitle } from './styles'
import { useItemDrag } from './useItemDrag'
import { isHidden } from './utils/isHidden'

interface IColumnProps {
  id: string
  text: string
  index: number
  isPreview?: boolean
}

export const Column = ({ id, text, index, isPreview }: IColumnProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({ type: 'COLUMN', id, text, index })

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover: (item: DragItem) => {
      if (item.type === 'COLUMN') {
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) {
          return
        }

        dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } })
        item.index = hoverIndex
      } else {
        const dragIndex = item.index
        const hoverIndex = 0
        const sourceColumn = item.columnId
        const targetColumn = id
        if (sourceColumn === targetColumn) {
          return
        }
        dispatch({
          type: 'MOVE_TASK',
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        })
        item.index = hoverIndex
        item.columnId = targetColumn
      }
    },
  })
  drag(drop(ref))

  return (
    <ColumnContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(isPreview, state.draggedItem, 'COLUMN', id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card
          text={task.text}
          key={task.id}
          id={task.id}
          index={i}
          columnId={state.lists[index].id}
        ></Card>
      ))}
      <AddNewItem
        dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => {
          dispatch({ type: 'ADD_TASK', payload: { text, laneId: id } })
        }}
      ></AddNewItem>
    </ColumnContainer>
  )
}
