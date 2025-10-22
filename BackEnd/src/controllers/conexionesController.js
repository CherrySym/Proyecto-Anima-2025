import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seguir a un usuario (crear conexión)
 * POST /conexiones/:usuarioId
 */
export const seguirUsuario = async (req, res) => {
  try {
    const seguidorId = req.user.id; // Usuario autenticado
    const seguidoId = parseInt(req.params.usuarioId);

    // Validaciones
    if (!seguidoId || isNaN(seguidoId)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    if (seguidorId === seguidoId) {
      return res.status(400).json({ error: 'No puedes seguirte a ti mismo' });
    }

    // Verificar que el usuario a seguir existe y no es admin
    const usuarioASeguir = await prisma.usuario.findUnique({
      where: { id: seguidoId },
      select: { id: true, rol: true }
    });

    if (!usuarioASeguir) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (usuarioASeguir.rol === 'ADMIN') {
      return res.status(403).json({ error: 'No puedes seguir a un administrador' });
    }

    // Verificar si ya existe la conexión
    const conexionExistente = await prisma.conexion.findUnique({
      where: {
        seguidorId_seguidoId: {
          seguidorId,
          seguidoId
        }
      }
    });

    if (conexionExistente) {
      return res.status(400).json({ error: 'Ya sigues a este usuario' });
    }

    // Crear la conexión
    const conexion = await prisma.conexion.create({
      data: {
        seguidorId,
        seguidoId
      },
      include: {
        seguido: {
          select: {
            id: true,
            nombre: true,
            avatar: true,
            ubicacion: true
          }
        }
      }
    });

    return res.status(201).json({
      message: 'Ahora sigues a este usuario',
      conexion
    });
  } catch (err) {
    console.error('Error en seguirUsuario:', err);
    return res.status(500).json({ error: 'Error al seguir usuario' });
  }
};

/**
 * Dejar de seguir a un usuario (eliminar conexión)
 * DELETE /conexiones/:usuarioId
 */
export const dejarDeSeguirUsuario = async (req, res) => {
  try {
    const seguidorId = req.user.id; // Usuario autenticado
    const seguidoId = parseInt(req.params.usuarioId);

    // Validaciones
    if (!seguidoId || isNaN(seguidoId)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    // Buscar la conexión
    const conexion = await prisma.conexion.findUnique({
      where: {
        seguidorId_seguidoId: {
          seguidorId,
          seguidoId
        }
      }
    });

    if (!conexion) {
      return res.status(404).json({ error: 'No sigues a este usuario' });
    }

    // Eliminar la conexión
    await prisma.conexion.delete({
      where: {
        seguidorId_seguidoId: {
          seguidorId,
          seguidoId
        }
      }
    });

    return res.json({ message: 'Dejaste de seguir a este usuario' });
  } catch (err) {
    console.error('Error en dejarDeSeguirUsuario:', err);
    return res.status(500).json({ error: 'Error al dejar de seguir usuario' });
  }
};

/**
 * Obtener usuarios que sigo (mis conexiones)
 * GET /conexiones/siguiendo
 */
export const obtenerSiguiendo = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const conexiones = await prisma.conexion.findMany({
      where: { seguidorId: usuarioId },
      include: {
        seguido: {
          select: {
            id: true,
            nombre: true,
            email: true,
            avatar: true,
            bio: true,
            ubicacion: true,
            tipo: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transformar respuesta
    const usuarios = conexiones.map(c => ({
      ...c.seguido,
      siguiendo: true,
      fechaConexion: c.createdAt
    }));

    return res.json(usuarios);
  } catch (err) {
    console.error('Error en obtenerSiguiendo:', err);
    return res.status(500).json({ error: 'Error al obtener conexiones' });
  }
};

/**
 * Obtener usuarios que me siguen (mis seguidores)
 * GET /conexiones/seguidores
 */
export const obtenerSeguidores = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const conexiones = await prisma.conexion.findMany({
      where: { seguidoId: usuarioId },
      include: {
        seguidor: {
          select: {
            id: true,
            nombre: true,
            email: true,
            avatar: true,
            bio: true,
            ubicacion: true,
            tipo: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Verificar si yo también los sigo
    const idsSeguidores = conexiones.map(c => c.seguidor.id);
    const conexionesMutuas = await prisma.conexion.findMany({
      where: {
        seguidorId: usuarioId,
        seguidoId: { in: idsSeguidores }
      },
      select: { seguidoId: true }
    });

    const siguiendoIds = new Set(conexionesMutuas.map(c => c.seguidoId));

    // Transformar respuesta
    const usuarios = conexiones.map(c => ({
      ...c.seguidor,
      siguiendo: siguiendoIds.has(c.seguidor.id),
      fechaConexion: c.createdAt
    }));

    return res.json(usuarios);
  } catch (err) {
    console.error('Error en obtenerSeguidores:', err);
    return res.status(500).json({ error: 'Error al obtener seguidores' });
  }
};

/**
 * Verificar si sigo a un usuario
 * GET /conexiones/check/:usuarioId
 */
export const verificarConexion = async (req, res) => {
  try {
    const seguidorId = req.user.id;
    const seguidoId = parseInt(req.params.usuarioId);

    if (!seguidoId || isNaN(seguidoId)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const conexion = await prisma.conexion.findUnique({
      where: {
        seguidorId_seguidoId: {
          seguidorId,
          seguidoId
        }
      }
    });

    return res.json({ siguiendo: !!conexion });
  } catch (err) {
    console.error('Error en verificarConexion:', err);
    return res.status(500).json({ error: 'Error al verificar conexión' });
  }
};

/**
 * Obtener estadísticas de conexiones
 * GET /conexiones/stats
 */
export const obtenerEstadisticas = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const [siguiendo, seguidores] = await Promise.all([
      prisma.conexion.count({ where: { seguidorId: usuarioId } }),
      prisma.conexion.count({ where: { seguidoId: usuarioId } })
    ]);

    return res.json({
      siguiendo, // Usuarios que sigo
      seguidores, // Usuarios que me siguen
      conexiones: siguiendo // Total de conexiones que tengo
    });
  } catch (err) {
    console.error('Error en obtenerEstadisticas:', err);
    return res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};
