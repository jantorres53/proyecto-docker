import { Router } from "express";

import areaController from "../controllers/area.controller";
import { verifyToken } from "../middlewares/auth.middleware";

class AreaRoutes{
    
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:idEmpresa',verifyToken, areaController.obtenerAreas);
        this.router.get('/verArea/:id',verifyToken, areaController.verArea);
        this.router.post('/',verifyToken, areaController.registrarArea);
        this.router.put('/:id',verifyToken, areaController.modificarArea);
        this.router.delete('/:id',verifyToken, areaController.eliminarArea);
    }
}

const areaRoutes = new AreaRoutes();
export default areaRoutes.router;