import { Router } from 'express';
import mantenimientoController from '../controllers/mantenimiento.controller';
import { verifyToken } from '../middlewares/auth.middleware'; // Asegúrate de tener este middleware implementado

class MantenimientoRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Obtener mantenimientos area
        this.router.get('/area/:idArea', verifyToken, mantenimientoController.obtenerMantenimientosArea)

        // Obtener mantenimientos completados
        this.router.get('/completos/cliente/:idCliente', verifyToken, mantenimientoController.obtenerMentenimientosCompletosCliente);
        this.router.get('/completos/empleado/:idEmpleado', verifyToken, mantenimientoController.obtenerMentenimientosCompletosEmpleado);

        // Obtener mantenimientos incompletos
        this.router.get('/incompletos/cliente/:idCliente', verifyToken, mantenimientoController.obtenerMentenimientoIncompletosCliente);
        this.router.get('/incompletos/empleado/:idEmpleado', verifyToken, mantenimientoController.obtenerMentenimientosIncompletosEmpleado);

        // Obtener solicitudes de mantenimientos
        this.router.get('/solicitudes/cliente/:idCliente', verifyToken, mantenimientoController.obtenerSolicitudesCliente);
        this.router.get('/solicitudes/empleado/:idEmpleado', verifyToken, mantenimientoController.obtenerSolicitudesEmpleado);

        // Ver detalles de un mantenimiento
        this.router.get('/:id', verifyToken, mantenimientoController.verMantenimiento);

        // Registrar un mantenimiento
        this.router.post('/', verifyToken, mantenimientoController.registrarMantenimiento);

        // Modificar un mantenimiento
        this.router.put('/:id', verifyToken, mantenimientoController.modificarMantenimiento);

        // Aceptar un mantenimiento
        this.router.put('/aceptar/:id/:costo/:fechaFin', verifyToken, mantenimientoController.aceptarMantenimiento);

        // Rechazar un mantenimiento
        this.router.put('/rechazar/:id', verifyToken, mantenimientoController.rechazarMantenimiento);

        // Cancelar un manyenimiento
        this.router.put('/cancelar/:id', verifyToken, mantenimientoController.cancelarMantenimiento);

        // Terminar un mantenimiento
        this.router.put('/terminar/:id', verifyToken, mantenimientoController.terminarMantenimiento);

        // Eliminar un mantenimiento
        this.router.delete('/:id', verifyToken, mantenimientoController.eliminarMantenimiento);
    }
}

const mantenimientoRoutes = new MantenimientoRoutes();
export default mantenimientoRoutes.router;
