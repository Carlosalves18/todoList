import React from 'react'
import TodoForm from '../components/TodoForm.jsx';
import { Container } from "react-bootstrap";
import TodoList from '../components/TodoList.jsx';
import axios from 'axios';

const App = () => {

  const [tarefas, setTarefas] = React.useState([])

  const handleGetList = async () => {
    try {
      const response = await axios.get("http://localhost:7777/api/tarefas")
      setTarefas(response.data.tarefas)
    } catch(error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    handleGetList()
  }, [])

  return (
    <Container>
        <TodoForm />
        <TodoList  tarefas={tarefas} setTarefas={setTarefas}/>
    </Container>
  )
}

export default App;