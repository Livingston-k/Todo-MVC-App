"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../validator/index"));
const middleware_1 = __importDefault(require("../middleware"));
const controller_1 = __importDefault(require("../controller"));
const router = express_1.default.Router();
router.post('/create', index_1.default.checkCreateTodo(), middleware_1.default.handleValidationErrors, controller_1.default.create);
router.get('/read', index_1.default.checkReadTodo(), middleware_1.default.handleValidationErrors, controller_1.default.read);
router.get('/show/:id', index_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, controller_1.default.show);
router.put('/update/:id', index_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, controller_1.default.update);
router.delete('/delete/:id', index_1.default.checkIdParam(), middleware_1.default.handleValidationErrors, controller_1.default.destroy);
exports.default = router;
