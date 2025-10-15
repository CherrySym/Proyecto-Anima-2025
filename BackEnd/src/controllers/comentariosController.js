// src/controllers/comentariosController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Crear un comentario en un post
 * Puede ser comentario principal o respuesta a otro comentario
 */
export const createComentario = async (req, res) => {
  try {
    const { postId, contenido, parentId } = req.body;
    const usuarioId = req.user?.id;
    const userTipo = req.user?.tipo;

    if (!usuarioId) {
      return res.status(401).json({ error: "Debes iniciar sesión" });
    }

    // Solo usuarios pueden comentar (no empresas)
    const isUsuario = ['ADOLESCENTE', 'JOVEN'].includes(userTipo) || userTipo === 'Usuario';
    if (!isUsuario) {
      return res.status(403).json({ error: "Solo usuarios pueden comentar" });
    }

    if (!postId || !contenido) {
      return res.status(400).json({ error: "postId y contenido son obligatorios" });
    }

    // Verificar que el post existe
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      select: { id: true }
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    // Si es una respuesta, verificar que el comentario padre existe
    if (parentId) {
      const comentarioPadre = await prisma.comentario.findUnique({
        where: { id: parseInt(parentId) },
        select: { id: true, postId: true }
      });

      if (!comentarioPadre) {
        return res.status(404).json({ error: "Comentario padre no encontrado" });
      }

      if (comentarioPadre.postId !== parseInt(postId)) {
        return res.status(400).json({ error: "El comentario padre no pertenece a este post" });
      }
    }

    // Crear comentario
    const comentario = await prisma.comentario.create({
      data: {
        usuarioId,
        postId: parseInt(postId),
        contenido,
        parentId: parentId ? parseInt(parentId) : null
      },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            avatar: true,
            tipo: true
          }
        }
      }
    });

    return res.status(201).json({
      ...comentario,
      content: comentario.contenido, // Alias para frontend
      author: comentario.usuario
    });
  } catch (err) {
    console.error("createComentario:", err);
    return res.status(500).json({ error: "Error al crear comentario" });
  }
};

/**
 * Obtener comentarios de un post
 * Solo devuelve comentarios principales (no respuestas)
 */
export const getComentariosByPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);

    const comentarios = await prisma.comentario.findMany({
      where: {
        postId,
        parentId: null // Solo comentarios principales
      },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            avatar: true,
            tipo: true
          }
        },
        respuestas: {
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                avatar: true,
                tipo: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transformar respuesta
    const comentariosTransformados = comentarios.map(c => ({
      id: c.id,
      contenido: c.contenido,
      content: c.contenido, // Alias
      createdAt: c.createdAt,
      usuario: c.usuario,
      author: c.usuario, // Alias
      respuestas: c.respuestas.map(r => ({
        id: r.id,
        contenido: r.contenido,
        content: r.contenido,
        createdAt: r.createdAt,
        usuario: r.usuario,
        author: r.usuario,
        parentId: r.parentId
      })),
      respuestasCount: c.respuestas.length
    }));

    return res.json(comentariosTransformados);
  } catch (err) {
    console.error("getComentariosByPost:", err);
    return res.status(500).json({ error: "Error al obtener comentarios" });
  }
};

/**
 * Obtener un comentario específico con todas sus respuestas
 */
export const getComentarioById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const comentario = await prisma.comentario.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            avatar: true,
            tipo: true
          }
        },
        post: {
          select: {
            id: true,
            contenido: true
          }
        },
        respuestas: {
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                avatar: true,
                tipo: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        comentarioPadre: {
          select: {
            id: true,
            contenido: true,
            usuario: {
              select: {
                nombre: true
              }
            }
          }
        }
      }
    });

    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    return res.json({
      ...comentario,
      content: comentario.contenido,
      author: comentario.usuario,
      respuestasCount: comentario.respuestas.length
    });
  } catch (err) {
    console.error("getComentarioById:", err);
    return res.status(500).json({ error: "Error al obtener comentario" });
  }
};

/**
 * Actualizar un comentario (solo el autor)
 */
export const updateComentario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { contenido } = req.body;
    const usuarioId = req.user?.id;

    if (!contenido) {
      return res.status(400).json({ error: "El contenido es obligatorio" });
    }

    // Verificar que el comentario existe y pertenece al usuario
    const comentario = await prisma.comentario.findUnique({
      where: { id },
      select: { usuarioId: true }
    });

    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    if (comentario.usuarioId !== usuarioId) {
      return res.status(403).json({ error: "No tienes permiso para editar este comentario" });
    }

    // Actualizar
    const comentarioActualizado = await prisma.comentario.update({
      where: { id },
      data: { contenido },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            avatar: true,
            tipo: true
          }
        }
      }
    });

    return res.json({
      ...comentarioActualizado,
      content: comentarioActualizado.contenido,
      author: comentarioActualizado.usuario
    });
  } catch (err) {
    console.error("updateComentario:", err);
    return res.status(500).json({ error: "Error al actualizar comentario" });
  }
};

/**
 * Eliminar un comentario (solo el autor o admin)
 * Elimina también todas las respuestas en cascada
 */
export const deleteComentario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarioId = req.user?.id;
    const userRol = req.user?.rol;

    // Verificar que el comentario existe y pertenece al usuario
    const comentario = await prisma.comentario.findUnique({
      where: { id },
      select: {
        usuarioId: true,
        _count: {
          select: { respuestas: true }
        }
      }
    });

    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    if (comentario.usuarioId !== usuarioId && userRol !== 'ADMIN') {
      return res.status(403).json({ error: "No tienes permiso para eliminar este comentario" });
    }

    // Eliminar (elimina en cascada las respuestas)
    await prisma.comentario.delete({ where: { id } });

    return res.json({
      success: true,
      message: "Comentario eliminado correctamente",
      respuestasEliminadas: comentario._count.respuestas
    });
  } catch (err) {
    console.error("deleteComentario:", err);
    return res.status(500).json({ error: "Error al eliminar comentario" });
  }
};

/**
 * Obtener comentarios de un usuario específico
 */
export const getComentariosByUsuario = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);

    const comentarios = await prisma.comentario.findMany({
      where: { usuarioId },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            avatar: true,
            tipo: true
          }
        },
        post: {
          select: {
            id: true,
            contenido: true,
            usuario: {
              select: { nombre: true }
            },
            empresa: {
              select: { nombre: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const comentariosTransformados = comentarios.map(c => ({
      id: c.id,
      contenido: c.contenido,
      content: c.contenido,
      createdAt: c.createdAt,
      postId: c.postId,
      post: {
        id: c.post.id,
        contenido: c.post.contenido,
        autor: c.post.usuario?.nombre || c.post.empresa?.nombre
      },
      usuario: c.usuario
    }));

    return res.json(comentariosTransformados);
  } catch (err) {
    console.error("getComentariosByUsuario:", err);
    return res.status(500).json({ error: "Error al obtener comentarios del usuario" });
  }
};
