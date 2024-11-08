import { DataTypes } from "sequelize"
import conn from "../config/conn.js"

const Tarefa = conn.define('tarefas', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
            isUUID: 4,
        }
    }, 
    tarefa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM,
        values: ["pendente", "concluida"],
        defaultValue: "pendente"
    }

}, 
{
    tableName: "tarefas"
})

export default Tarefa