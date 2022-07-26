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
app.post('/create', index_2.default.checkCreateTodo(), async (req, res) => {
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
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port);
});
