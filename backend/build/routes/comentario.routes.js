"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentario_controller_1 = __importDefault(require("../controllers/comentario.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class ComentarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Bienvenido al endpoint de comentarios. Proporcione un ID para acceder a mas detalles.');
        });
    
        this.router.get('/:idMantenimiento', auth_middleware_1.verifyToken, comentario_controller_1.default.obtenerComentarios);
        this.router.get('/verComentario/:id', auth_middleware_1.verifyToken, comentario_controller_1.default.verComentario);
        this.router.post('/', auth_middleware_1.verifyToken, comentario_controller_1.default.registrarComentario);
        this.router.put('/:id', auth_middleware_1.verifyToken, comentario_controller_1.default.modificarComentario);
        this.router.delete('/:id', auth_middleware_1.verifyToken, comentario_controller_1.default.eliminarComentario);
    }
}
const comentarioRoutes = new ComentarioRoutes();
exports.default = comentarioRoutes.router;
