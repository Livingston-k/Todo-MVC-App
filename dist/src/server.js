"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./model/index"));
const database_config_1 = __importDefault(require("./config/database.config"));
const uuid_1 = require("uuid");
const index_2 = __importDefault(require("./validator/index"));
const middleware_1 = __importDefault(require("./middleware"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// DATABASE CONFIG
database_config_1.default.sync().then(() => {
    console.log('Connected to database');
});
// ROUTERS
app.get('/', (req, res) => {
    res.json({ 'msg': 'Use Postman to consume the Todo api' });
});
// CREATE TODO RECORD
app.post('/create', index_2.default.checkCreateTodo(), middleware_1.default.handleValidationErrors, async (req, res) => {
    const id = (0, uuid_1.v4)();
    try {
        const record = await index_1.default.create({
            ...req.body, id
        });
        res.json({ record, msg: "Record successfully added" });
    }
    catch (error) {
        res.json({ msg: "Error creting todo", status: 500 });
    }
});
//READ TODO RECORDS
app.get('/read', index_2.default.checkReadTodo(), middleware_1.default.handleValidationErrors, async (req, res) => {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const todos = await index_1.default.findAll({ limit, offset });
        res.json(todos);
    }
    catch (error) {
        res.json({ msg: "Error reading todos", status: 500 });
    }
});
//READ TODO RECORDS
app.get('/read/:id', index_2.default.checkIdParam(), middleware_1.default.handleValidationErrors, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await index_1.default.findOne({ where: { id } });
        res.json(todo);
    }
    catch (error) {
        res.json({ msg: "Error reading todo if id ", status: 500 });
    }
});
// UPDATE TODO RECORDS
app.put('/update/:id', index_2.default.checkIdParam(), middleware_1.default.handleValidationErrors, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await index_1.default.findOne({ where: { id } });
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
});
// Delete TODO RECORDS
app.delete('/delete/:id', index_2.default.checkIdParam(), middleware_1.default.handleValidationErrors, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await index_1.default.findOne({ where: { id } });
        if (!todo) {
            return res.json({ msg: "No record found for the provided id", status: 404 });
        }
        const deletedRecord = await todo.destroy();
        res.json({ msg: 'Todo deleted successfully' });
    }
    catch (error) {
        res.json({ msg: "Error deleting todo", status: 500 });
    }
});
// SERVER 
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port);
});
