"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mantenimiento_controller_1 = __importDefault(require("../controllers/mantenimiento.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware"); // Asegúrate de tener este middleware implementado
class MantenimientoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener mantenimientos area
        this.router.get('/area/:idArea', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.obtenerMantenimientosArea);
        // Obtener mantenimientos completados
        this.router.get('/completos/cliente/:idCliente', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.obtenerMentenimientosCompletosCliente);
        this.router.get('/completos/empleado/:idEmpleado', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.obtenerMentenimientosCompletosEmpleado);
        // Obtener mantenimientos incompletos
        this.router.get('/incompletos/cliente/:idCliente', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.obtenerMentenimientoIncompletosCliente);
        this.router.get('/incompletos/empleado/:idEmpleado', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.obtenerMentenimientosIncompletosEmpleado);
        // Obtener solicitudes de mantenimientos
        this.router.get('/solicitudes/cliente/:idCliente', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.obtenerSolicitudesCliente);
        this.router.get('/solicitudes/empleado/:idEmpleado', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.obtenerSolicitudesEmpleado);
        // Ver detalles de un mantenimiento
        this.router.get('/:id', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.verMantenimiento);
        // Registrar un mantenimiento
        this.router.post('/', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.registrarMantenimiento);
        // Modificar un mantenimiento
        this.router.put('/:id', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.modificarMantenimiento);
        // Aceptar un mantenimiento
        this.router.put('/aceptar/:id/:costo/:fechaFin', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.aceptarMantenimiento);
        // Rechazar un mantenimiento
        this.router.put('/rechazar/:id', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.rechazarMantenimiento);
        // Cancelar un manyenimiento
        this.router.put('/cancelar/:id', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.cancelarMantenimiento);
        // Terminar un mantenimiento
        this.router.put('/terminar/:id', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.terminarMantenimiento);
        // Eliminar un mantenimiento
        this.router.delete('/:id', auth_middleware_1.verifyToken, mantenimiento_controller_1.default.eliminarMantenimiento);
    }
}
const mantenimientoRoutes = new MantenimientoRoutes();
exports.default = mantenimientoRoutes.router;
