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
    accept: 'COLUMN',
    hover: (item: DragItem) => {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } })
      item.index = hoverIndex
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
      {state.lists[index].tasks.map((task, index) => (
        <Card
          text={task.text}
          key={task.id}
          id={task.id}
          index={index}
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
