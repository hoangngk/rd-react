import './App.css'
import { Card } from './Card'
import { Column } from './Column'
import { AppContainer } from './styles'
import { AddNewItem } from './AddNewItem'

const App = () => {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Generate app scaffold" />
        <AddNewItem
          dark={true}
          toggleButtonText="Add new card"
          onAdd={() => {}}
        ></AddNewItem>
      </Column>
      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>
      <Column text="Done">
        <Card text="Begin to use static typing" />
      </Column>
    </AppContainer>
  )
}

export default App
