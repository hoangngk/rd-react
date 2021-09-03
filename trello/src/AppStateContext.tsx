import { createContext, useContext, useEffect, useReducer } from 'react'
import { v4 } from 'uuid'
import { save } from './api'
import { DragItem } from './DragItem'
import { findItemIndexById } from './utils/findItemIndexById'
import { moveItem } from './utils/moveItem'
import { withData } from './withData'

export interface AppState {
  lists: List[]
  draggedItem?: DragItem
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

interface Task {
  id: string
  text: string
}

interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

type Action =
  | { type: 'ADD_LIST'; payload: string }
  | { type: 'ADD_TASK'; payload: { text: string; laneId: string } }
  | { type: 'MOVE_LIST'; payload: { dragIndex: number; hoverIndex: number } }
  | {
      type: 'MOVE_TASK'
      payload: {
        dragIndex: number
        hoverIndex: number
        sourceColumn: string
        targetColumn: string
      }
    }
  | { type: 'SET_DRAGGED_ITEM'; payload: DragItem | undefined }

const appStateReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [...state.lists, { id: v4(), text: action.payload, tasks: [] }],
      }
    }

    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(state.lists, action.payload.laneId)
      state.lists[targetLaneIndex].tasks.push({
        id: v4(),
        text: action.payload.text,
      })
      return { ...state }
    }

    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return { ...state }
    }

    case 'MOVE_TASK': {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload
      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn)
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)

      return { ...state }
    }

    case 'SET_DRAGGED_ITEM':
      return { ...state, draggedItem: action.payload }
    default:
      return state
  }
}

export const AppStateProvider = withData(({ children, initialState }: React.PropsWithChildren<{initialState: AppState}>) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  useEffect(() => {
    save(state)
  }, [state])

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
})

export const useAppState = () => {
  return useContext(AppStateContext)
}
