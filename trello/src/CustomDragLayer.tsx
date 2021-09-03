import React from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'
import { CustomDragLayerContainer } from './styles'
import { Column } from './Column'
import { Card } from './Card'

const getItemStyle = (currentOffset: XYCoord | null): React.CSSProperties => {
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`

  return {
    transform,
    WebkitTransform: transform,
  }
}

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyle(currentOffset)}>
        {item.type === 'COLUMN' ? (
          <Column
            id={item.id}
            text={item.text}
            index={item.index}
            isPreview={true}
          />
        ) : (
          <Card
            text={item.text}
            key={item.id}
            id={item.id}
            index={item.index}
            columnId={item.columnId}
            isPreview={true}
          ></Card>
        )}
      </div>
    </CustomDragLayerContainer>
  ) : null
}
