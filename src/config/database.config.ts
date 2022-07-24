import { Sequelize } from "sequelize";

const db = new Sequelize('todo', '', '', {
    storage: './database.sqlite',
    dialect: 'sqlite',
    logging: false
})

export default db 