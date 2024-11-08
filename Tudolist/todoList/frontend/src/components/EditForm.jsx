import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

const EditForm = ({show, handleClose, tarefa, handleSubmitEdit, handleEdit}) => {

    const ref = React.useRef()

    React.useEffect(()=>{
        if(tarefa){
            const form = ref
            form.tarefa = tarefa.tarefa
            form.descricao = tarefa.descricao 
        }
    }, [tarefa])

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const form = ref
        handleEdit({
            ...tarefa,
            tarefa: form.tarefa.value,
            descricao: form.descricao.value
        })
        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='tarefaEdit'>
                            <Form.Label>Tarefa</Form.Label>
                            <Form.Control/>
                        </Form.Group>
                        <Form.Group controlId='descricaoEdit'>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default EditForm