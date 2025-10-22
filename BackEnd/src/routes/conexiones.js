import { Router } from 'express';
import {
  seguirUsuario,
  dejarDeSeguirUsuario,
  obtenerSiguiendo,
  obtenerSeguidores,
  verificarConexion,
  obtenerEstadisticas
} from '../controllers/conexionesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Seguir/Dejar de seguir
router.post('/:usuarioId', seguirUsuario);
router.delete('/:usuarioId', dejarDeSeguirUsuario);

// Obtener listas
router.get('/siguiendo', obtenerSiguiendo);
router.get('/seguidores', obtenerSeguidores);

// Verificar y estadísticas
router.get('/check/:usuarioId', verificarConexion);
router.get('/stats', obtenerEstadisticas);

export default router;
