import { AddNewItem } from './AddNewItem'
import './App.css'
import { useAppState } from './AppStateContext'
import { Card } from './Card'
import { Column } from './Column'
import { AppContainer } from './styles'

const App = () => {
  const { state } = useAppState()

  return (
    <AppContainer>
      {state.lists.map((list) => (
        <Column text={list.text} key={list.id}>
          {list.tasks.map((task) => (
            <Card text={task.text} key={task.id}></Card>
          ))}
        </Column>
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={() => {}}
      ></AddNewItem>
    </AppContainer>
  )
}

export default App
