import Tarefa from "../models/tarefaModel.js"
import { z } from "zod"
import { where } from "sequelize"

const createSchema = z.object({
    tarefa: z.string({
        invalid_type_error: "A tarefa deve ser um texto",
        required_error: "Tarefa é obrigatória"
    })
        .min(3, {message: "A tarefa deve conter pelo menos 3 caracteres"})
        .max(255, {message: "A tarefa deve conter no máximo 255 caracteres"}),
})

const idSchema = z.object({
    id: z.string().uuid({message: 'Id inválido '})
})

export const create = async (req, res) => {
    const createValidation = createSchema.safeParse(req.body)
    
    if(!createValidation.success){
        res.status(400).json(createValidation.error)
        return
    }

    const { tarefa } = createValidation.data
    const descricao = req.body?.descricao || null

    const novaTarefa = {
        tarefa, 
        descricao
    }

    try {
        const criarTarefa = await Tarefa.create(novaTarefa)
        res.status(201).json(criarTarefa)
    } catch (error) {
        console.error(error)
        res.status(500).json({ Err: "Erro ao cadastrar tarefa" })
    }
}

//GET -> 3333/api/tarefas?page=1&limit=10

export const getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * 10
    

    try {
        const tarefas = await Tarefa.findAndCountAll({offset: offset, limit: limit})

        const totalPaginas = Math.ceil(tarefas.count / limit)

        if (tarefas.length === 0) {
            res.status(404).json({ message: "Não há tarefas cadastradas" })
            return
        }

        res.status(200).json({
            totalTarefas: tarefas.count,
            totalPaginas,
            paginaAtual: page,
            itensPorPagina: limit,
            proximaPagina: totalPaginas === 0 ? null: `http://localhost:7777/api/tarefas/page=${page + 1}`,
            tarefas: tarefas.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ Err: "Erro ao buscar tarefas" })
    }

}

export const getTarefa = async (req, res) => {
    const idValidation = idSchema.safeParse(req.params)
    if(!idValidation.success){
        res.status(400).json({message: idValidation.error})
    }

    const { id }= idValidation.data
    
    try {
        const tarefa = await Tarefa.findByPk(id)
        if(!tarefa){
            res.status(404).json({message: "Tarefa não encontrada"})
            return
        }
        res.status(200).json(tarefa)
    } catch (error) {
        console.error(error)
        res.status(500).json({ Err: "Erro ao buscar tarefa" })
    }
}

export const updateTarefa = async (req, res) => {
    res.status(200).json("Chegou no controlador")
}

export const updateStatusTarefa = async (req, res) => {
    const idValidation = idSchema.safeParse(req.params)
    if(!idValidation.success){
        res.status(400).json({message: idValidation.error})
    }

    const { id } = idValidation.data

    try {
        const tarefa = await Tarefa.findOne({ raw: true, where: {id}})

        if(!tarefa){
            res.status(404).json({message: "Tarefa não encontrada"})
            return
        }

        if(tarefa.status === 'pendente'){
            await Tarefa.update({
                status: "concluida"
            },
            {
                where: {id}
            })
        }else if(tarefa.status === 'concluida'){
            await Tarefa.update({
                status: "pendente"
            },
            {
                where: {id}
            })
        }

        const tarefaAtualizada = await Tarefa.findOne({
            where: { id },
            attributes: ["id", "status"]
        })
        res.status(200).json(tarefaAtualizada)
       
    } catch (error) {
        console.error(error)
        res.status(500).json({ Err: "Erro ao atualizar status da tarefa" })
    }
}

export const getTarefaStatus = async (req, res) => {
    const { situacao } = req.params

    try {
        const tarefaStatus = await Tarefa.findAll({where: {status: situacao}})

        res.status(200).json(tarefaStatus)
    } catch (error) {
        console.error(error)
        res.status(500).json({ Err: "Erro ao pegar tarefa" })
    }
}

export const deleteTarefa = async (req, res) => {
    const idValidation = idSchema.safeParse(req.params)
    if(!idValidation.success){
        res.status(400).json({message: idValidation.error})
    }

    const { id } = idValidation.data

    try {
        const tarefaDeletada = await Tarefa.destroy({
            where: { id },
        })
        if(tarefaDeletada === 0){
            res.status(404).json({message: "Tarefa não existe"})
        }
        res.status(200).json({message: "Tarefa excluída"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ Err: "Erro ao excluir tarefa" })
    }
}