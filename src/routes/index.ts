import express from 'express'
import TodoValidator from '../validator/index'
import Middleware from '../middleware';
import TodoController from '../controller'

const router = express.Router()

router.post('/create', TodoValidator.checkCreateTodo(), Middleware.handleValidationErrors, TodoController.create)
router.get('/read', TodoValidator.checkReadTodo(), Middleware.handleValidationErrors, TodoController.read)
router.get('/show/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.show)
router.put('/update/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.update)
router.delete('/delete/:id', TodoValidator.checkIdParam(), Middleware.handleValidationErrors, TodoController.destroy)

export default router