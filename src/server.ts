import express, { Request, Response } from 'express'
import TodoInstatance from './model/index'
import db from './config/database.config'
import { v4 as uuidv4 } from 'uuid';
import TodoValidator from './validator/index'
const app = express()
const port = 3000
app.use(express.json())
// DATABASE CONFIG
db.sync().then(() => {
    console.log('Connected to database')
})

// ROUTERS
app.get('/', (req: Request, res: Response) => {
    res.json({ 'msg': 'Use Postman to consume the Todo api' })
})
app.post('/create', TodoValidator.checkCreateTodo(), async (req: Request, res: Response) => {
    const id = uuidv4()
    try {
        const record = await TodoInstatance.create({
            ...req.body, id
        })
        res.json({ record, msg: "Record successfully added" })
    } catch (error) {
        res.json({ msg: "Error creting todo", status: 500 })
    }
})

app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port)
})