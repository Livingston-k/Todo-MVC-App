const { body, query, param } = require('express-validator')

class TodoValidator {
    checkCreateTodo() {
        return [
            body('title')
                .notEmpty()
                .withMessage("The title valiue should be provided"),
            body('completed')
                .optional()
                .isBoolean()
                .withMessage("The value should be boolean")
                .isIn([0, false])
                .withMessage("The completed status should be 0 or false"),
        ]
    }
    checkReadTodo() {
        return [
            query('limit')
                .notEmpty()
                .withMessage("The limit query should be provided")
                .isInt({ min: 1, max: 10 })
                .withMessage("The limit query should be  1-10"),
            query('offset')
                .optional()
                .isNumeric()
                .withMessage("The offest query should be number")
        ]
    }
    checkIdParam() {
        return [
            param('id')
                .notEmpty()
                .withMessage("The id should not be empty")
                .isUUID(4)
                .withMessage("param should be uuid version 4")
        ]
    }
}

export default new TodoValidator