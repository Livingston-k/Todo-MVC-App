import express, { Request, Response } from 'express'
import db from './config/database.config'
import TodoValidator from './validator/index'
import Middleware from './middleware';
import TodoController from './controller'

const app = express()
const port = 3000
app.use(express.json())

// DATABASE CONFIG
db.sync().then(() => {
    console.log('Connected to database')
})

//TODO ROUTES
app.get('/', TodoController.alert)
app.post('/create', TodoValidator.checkCreateTodo(), Middleware.handleValidationErrors, TodoController.create)
app.get('/read', TodoValidator.checkReadTodo(), Middleware.handleValidationErrors, TodoController.read)
app.get('/show/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.show)
app.put('/update/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.update)
app.delete('/delete/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.destroy)

// SERVER 
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port)
})