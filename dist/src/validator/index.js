"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { body } = require('express-validator');
class TodoValidator {
    checkCreateTodo() {
        return [
            body('title').isEmpty().withMessage("The title valiue should be provided")
        ];
    }
}
exports.default = new TodoValidator;
