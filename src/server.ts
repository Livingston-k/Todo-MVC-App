import express, { Request, Response } from 'express'
import TodoInstatance from './model/index'
import db from './config/database.config'
import { v4 as uuidv4 } from 'uuid';
import TodoValidator from './validator/index'
import Middleware from './middleware';
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

// CREATE TODO RECORD
app.post('/create', TodoValidator.checkCreateTodo(), Middleware.handleValidationErrors, async (req: Request, res: Response) => {
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
//READ TODO RECORDS
app.get('/read', TodoValidator.checkReadTodo(), Middleware.handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;
        const todos = await TodoInstatance.findAll({ limit, offset });
        res.json(todos)
    } catch (error) {
        res.json({ msg: "Error reading todos", status: 500 })
    }
})

//READ TODO RECORDS
app.get('/read/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const todo = await TodoInstatance.findOne({ where: { id } });
        res.json(todo)
    } catch (error) {
        res.json({ msg: "Error reading todo if id ", status: 500 })
    }
})

// UPDATE TODO RECORDS
app.put('/update/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const todo = await TodoInstatance.findOne({ where: { id } });
        if (!todo) {
            return res.json({ msg: "No record found for the provided id", status: 404 })
        }

        const updatedRecord = await todo.update({
            completed: !todo.getDataValue('completed')
        })
        res.json({ updatedRecord, msg: 'Todo updated successfully' })
    } catch (error) {
        res.json({ msg: "Error reading todo if id ", status: 500 })
    }
})
// Delete TODO RECORDS
app.delete('/delete/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const todo = await TodoInstatance.findOne({ where: { id } });
        if (!todo) {
            return res.json({ msg: "No record found for the provided id", status: 404 })
        }
        const deletedRecord = await todo.destroy()
        res.json({ msg: 'Todo deleted successfully' })
    } catch (error) {
        res.json({ msg: "Error deleting todo", status: 500 })
    }
})
// SERVER 
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port)
})