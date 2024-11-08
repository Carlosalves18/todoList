import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const TodoForm = () => {

    const [tarefa, setTarefa] = React.useState('')
    const [descricao, setDescricao] = React.useState(null)
    const [message, setMessage] = React.useState(null)
    const [loading, setLoading] = React.useState(null)

    const handlePost = async (event) => {

        setLoading("Carregando...")

        try {
            await axios.post("http://localhost:7777/api/tarefas", {
                tarefa, 
                descricao
            })
            setMessage("Tarefa criada com sucesso!")
            setTarefa('')
            setDescricao('')
        } catch (error) {
            setMessage("Não foi possível salvar a sua tarefa!")
            console.error(error)
        }
    }

  return (
    <Form onSubmit={handlePost}>
      <Form.Group className="mb-3" controlId='tarefa'>
        <Form.Label>Título</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Digite o título da sua tarefa" 
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            required />
      </Form.Group>

      <Form.Group className="mb-3" controlId='descricao'>
        <Form.Label>Descrição</Form.Label>
        <Form.Control 
            type="textarea" 
            placeholder="Digite a descrição da sua tarefa"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            />
      </Form.Group>

      <Button variant="primary" type="submit">
        Postar
      </Button>
      {message ? <p>{message}</p> : <p>{loading}</p>}
    </Form>
  )
}

export default TodoForm;