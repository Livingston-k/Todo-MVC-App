"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const index_1 = __importDefault(require("./validator/index"));
const middleware_1 = __importDefault(require("./middleware"));
const controller_1 = __importDefault(require("./controller"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// DATABASE CONFIG
database_config_1.default.sync().then(() => {
    console.log('Connected to database');
});
//TODO ROUTES
app.get('/', controller_1.default.alert);
app.post('/create', index_1.default.checkCreateTodo(), middleware_1.default.handleValidationErrors, controller_1.default.create);
app.get('/read', index_1.default.checkReadTodo(), middleware_1.default.handleValidationErrors, controller_1.default.read);
app.get('/show/:id', index_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, controller_1.default.show);
app.put('/update/:id', index_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, controller_1.default.update);
app.delete('/delete/:id', index_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, controller_1.default.destroy);
// SERVER 
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port);
});
