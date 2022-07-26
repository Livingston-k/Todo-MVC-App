"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const routes_1 = __importDefault(require("./routes"));
const controller_1 = __importDefault(require("./controller"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// DATABASE CONFIG
database_config_1.default.sync().then(() => {
    console.log('Connected to database');
});
//ROUTES
app.get('/', controller_1.default.alert);
app.use("/api/", routes_1.default);
// SERVER 
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port);
});
