import axios from 'axios'
import React from 'react'
import { Table, Button } from 'react-bootstrap'
import EditForm from "./EditForm"

const TodoList = ({tarefas, setTarefas}) => {

  const [show, setShow] = React.useState(false)
  const [ondEdit, setOnEdit] = React.useState(null)

  const handleEdit = (tarefa) =>{
    setOnEdit(tarefa)
    setShow(true)
  }

  const handleSubmitEdit = async (editedTarefa) => {
    try {
      await axios.put(`http://localhost:7777/tarefas/${editedTarefa.id}`, editedTarefa)
      setTarefas((prevTarefas) => prevTarefas.map((tarefa) => (tarefa.is === editedTarefa.id ? editedTarefa : tarefa)))
      setShow(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7777/api/tarefas/${id}`)
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Descrição</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      {tarefas.map((tarefa, index) => (
      <tbody key={index}>
        <tr>
          <td>{tarefa.tarefa}</td>
          <td>{tarefa.descricao}</td>
          <td>{tarefa.status}</td>
          <td>            
            <Button variant="warning" onClick={() => handleEdit(tarefa)}>Editar</Button>
            <Button variant="danger" onClick={()=> handleDelete(tarefa.id)}>Deletar</Button>
          </td>
        </tr>
      </tbody>
      ))}
    </Table>
    <EditForm show={show} handleClose={()=> setShow(false)} tarefa={ondEdit}/>
    </>
  );
}

export default TodoList;