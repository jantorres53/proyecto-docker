import { Router } from 'express';
import comentarioController from '../controllers/comentario.controller';
import { verifyToken } from '../middlewares/auth.middleware';

class ComentarioRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:idMantenimiento', verifyToken, comentarioController.obtenerComentarios);
        this.router.get('/verComentario/:id', verifyToken, comentarioController.verComentario);
        this.router.post('/', verifyToken, comentarioController.registrarComentario);
        this.router.put('/:id', verifyToken, comentarioController.modificarComentario);
        this.router.delete('/:id', verifyToken, comentarioController.eliminarComentario);
    }
}

const comentarioRoutes = new ComentarioRoutes();
export default comentarioRoutes.router;
