"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const model_1 = __importDefault(require("../model"));
class TodoController {
    // READ TODO WITH PAGENATIONS
    async read(req, res) {
        try {
            const limit = req.query?.limit;
            const offset = req.query?.offset;
            const todos = await model_1.default.findAll({ limit, offset });
            res.json(todos);
        }
        catch (error) {
            res.json({ msg: "Error reading todos", status: 500 });
        }
    }
    // CREATE NEW TODO
    async create(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const record = await model_1.default.create({
                ...req.body, id
            });
            res.json({ record, msg: "Record successfully added" });
        }
        catch (error) {
            res.json({ msg: "Error creting todo", status: 500 });
        }
    }
    // TODO DETAILS
    async show(req, res) {
        try {
            const { id } = req.params;
            const todo = await model_1.default.findOne({ where: { id } });
            res.json(todo);
        }
        catch (error) {
            res.json({ msg: "Error reading todo if id ", status: 500 });
        }
    }
    // UPDATE TODO
    async update(req, res) {
        try {
            const { id } = req.params;
            const todo = await model_1.default.findOne({ where: { id } });
            if (!todo) {
                return res.json({ msg: "No record found for the provided id", status: 404 });
            }
            const updatedRecord = await todo.update({
                completed: !todo.getDataValue('completed')
            });
            res.json({ updatedRecord, msg: 'Todo updated successfully' });
        }
        catch (error) {
            res.json({ msg: "Error reading todo if id ", status: 500 });
        }
    }
    // DELETE TODO
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const todo = await model_1.default.findOne({ where: { id } });
            if (!todo) {
                return res.json({ msg: "No record found for the provided id", status: 404 });
            }
            const deletedRecord = await todo.destroy();
            res.json({ msg: 'Todo deleted successfully' });
        }
        catch (error) {
            res.json({ msg: "Error deleting todo", status: 500 });
        }
    }
    // WARNING ROUTE
    async alert(req, res) {
        res.json({ 'msg': 'Use Postman to consume the Todo api', 'create': '/create', 'read': '/read?limit=10', 'show': '/show/id', 'update': '/update/id', 'delete': '/delete/id', });
    }
}
exports.default = new TodoController();
