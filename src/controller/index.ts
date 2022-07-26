import express, { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import TodoInstatance from '../model'
class TodoController {

    // READ TODO WITH PAGENATIONS
    async read(req: Request, res: Response) {
        try {
            const limit = req.query?.limit as number | undefined;
            const offset = req.query?.offset as number | undefined;
            const todos = await TodoInstatance.findAll({ limit, offset });
            res.json(todos)
        } catch (error) {
            res.json({ msg: "Error reading todos", status: 500 })
        }
    }

    // CREATE NEW TODO
    async create(req: Request, res: Response) {
        const id = uuidv4()
        try {
            const record = await TodoInstatance.create({
                ...req.body, id
            })
            res.json({ record, msg: "Record successfully added" })
        } catch (error) {
            res.json({ msg: "Error creting todo", status: 500 })
        }
    }

    // TODO DETAILS
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params
            const todo = await TodoInstatance.findOne({ where: { id } });
            res.json(todo)
        } catch (error) {
            res.json({ msg: "Error reading todo if id ", status: 500 })
        }
    }

    // UPDATE TODO
    async update(req: Request, res: Response) {
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
    }

    // DELETE TODO
    async destroy(req: Request, res: Response) {
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
    }

    // WARNING ROUTE
    async alert(req: Request, res: Response) {
        res.json({ 'msg': 'Use Postman to consume the Todo api', 'create': '/create', 'read': '/read?limit=10', 'show': '/show/id', 'update': '/update/id', 'delete': '/delete/id', })
    }
}

export default new TodoController()