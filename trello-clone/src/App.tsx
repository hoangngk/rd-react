import { AddNewItem } from './AddNewItem'
import './App.css'
import { useAppState } from './AppStateContext'
import { Column } from './Column'
import { AppContainer } from './styles'

const App = () => {
  const { state, dispatch } = useAppState()

  return (
    <AppContainer>
      {state.lists.map((list, index) => (
        <Column text={list.text} key={list.id} id={list.id} index={index}></Column>
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => {
          dispatch({ type: 'ADD_LIST', payload: text })
        }}
      ></AddNewItem>
    </AppContainer>
  )
}

export default App
