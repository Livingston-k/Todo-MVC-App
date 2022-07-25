const { body } = require('express-validator')

class TodoValidator {
    checkCreateTodo() {
        return [
            body('title').isEmpty().withMessage("The title valiue should be provided")
        ]
    }
}

export default new TodoValidator