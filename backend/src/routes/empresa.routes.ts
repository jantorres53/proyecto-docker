import { Router } from "express";
import empresaController from "../controllers/empresa.controller";
import { verifyToken } from "../middlewares/auth.middleware";


class NotaRoutes{
    
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/',verifyToken, empresaController.obtenerEmpresas);
        this.router.get('/:id',verifyToken, empresaController.verEmpresa)
        this.router.post('/',empresaController.registrarEmpresa);
        this.router.put('/:id',verifyToken, empresaController.modificarEmpresa);
        this.router.delete('/:id',verifyToken, empresaController.eliminarEmpresa);
    }
}

const notaRoutes = new NotaRoutes();
export default notaRoutes.router;