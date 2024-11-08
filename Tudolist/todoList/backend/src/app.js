import express from "express"
import cors from "cors"

import conn from "./config/conn.js"

import Tarefa from "./models/tarefaModel.js"

import tarefaRouter from "./routes/tarefaRoute.js"

const app = express()

//3 middlewares para a api funcionar corretamente
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/tarefas', tarefaRouter)

//Necessario para sincronizar os models no projeto
conn
    .sync(/*{force: true}*/)
    .then(() => {
        console.log("Conectado!")
    })
    .catch((error) => console.error(error))


app.use((req, res) => {
    res.status(404).json({message: "Rota não encotrada"})
})

export default app
