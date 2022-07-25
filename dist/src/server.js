"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const app = (0, express_1.default)();
const port = 3000;
// DATABASE CONFIG
database_config_1.default.sync().then(() => {
    console.log('Connected to database');
});
// ROUTERS
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port);
});
