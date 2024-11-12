"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_controller_1 = __importDefault(require("../controllers/empresa.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class NotaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_middleware_1.verifyToken, empresa_controller_1.default.obtenerEmpresas);
        this.router.get('/:id', auth_middleware_1.verifyToken, empresa_controller_1.default.verEmpresa);
        this.router.post('/', empresa_controller_1.default.registrarEmpresa);
        this.router.put('/:id', auth_middleware_1.verifyToken, empresa_controller_1.default.modificarEmpresa);
        this.router.delete('/:id', auth_middleware_1.verifyToken, empresa_controller_1.default.eliminarEmpresa);
    }
}
const notaRoutes = new NotaRoutes();
exports.default = notaRoutes.router;
