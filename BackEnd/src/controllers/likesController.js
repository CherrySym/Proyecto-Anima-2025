// src/controllers/likesController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Toggle like en un post (dar like o quitar like)
 * Solo usuarios pueden dar like
 */
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const usuarioId = req.user?.id;
    const userTipo = req.user?.tipo;

    if (!usuarioId) {
      return res.status(401).json({ error: "Debes iniciar sesión" });
    }

    // Solo usuarios pueden dar like (no empresas)
    const isUsuario = ['ADOLESCENTE', 'JOVEN'].includes(userTipo) || userTipo === 'Usuario';
    if (!isUsuario) {
      return res.status(403).json({ error: "Solo usuarios pueden dar like" });
    }

    if (!postId) {
      return res.status(400).json({ error: "postId es obligatorio" });
    }

    // Verificar que el post existe
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      select: { id: true }
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    // Buscar like existente
    const likeExistente = await prisma.like.findUnique({
      where: {
        postId_usuarioId: {
          postId: parseInt(postId),
          usuarioId
        }
      }
    });

    if (likeExistente) {
      // Si ya existe, quitarlo (unlike)
      await prisma.like.delete({
        where: { id: likeExistente.id }
      });

      // Obtener nuevo conteo
      const likesCount = await prisma.like.count({
        where: { postId: parseInt(postId) }
      });

      return res.json({
        action: 'unliked',
        isLiked: false,
        likesCount,
        message: "Like eliminado"
      });
    } else {
      // Si no existe, crearlo (like)
      await prisma.like.create({
        data: {
          usuarioId,
          postId: parseInt(postId)
        }
      });

      // Obtener nuevo conteo
      const likesCount = await prisma.like.count({
        where: { postId: parseInt(postId) }
      });

      return res.json({
        action: 'liked',
        isLiked: true,
        likesCount,
        message: "Like agregado"
      });
    }
  } catch (err) {
    console.error("toggleLike:", err);
    return res.status(500).json({ error: "Error al procesar like" });
  }
};

/**
 * Obtener todos los likes de un post específico
 */
export const getLikesByPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);

    const likes = await prisma.like.findMany({
      where: { postId },
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
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      total: likes.length,
      likes: likes.map(l => ({
        id: l.id,
        createdAt: l.createdAt,
        usuario: l.usuario
      }))
    });
  } catch (err) {
    console.error("getLikesByPost:", err);
    return res.status(500).json({ error: "Error al obtener likes" });
  }
};

/**
 * Verificar si el usuario actual le dio like a un post
 */
export const checkUserLike = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      return res.json({ isLiked: false });
    }

    const like = await prisma.like.findUnique({
      where: {
        postId_usuarioId: {
          postId,
          usuarioId
        }
      }
    });

    return res.json({
      isLiked: !!like,
      likeId: like?.id || null
    });
  } catch (err) {
    console.error("checkUserLike:", err);
    return res.status(500).json({ error: "Error al verificar like" });
  }
};

/**
 * Obtener posts que le gustaron a un usuario
 */
export const getLikedPostsByUser = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);

    const likes = await prisma.like.findMany({
      where: { usuarioId },
      include: {
        post: {
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                avatar: true,
                tipo: true
              }
            },
            empresa: {
              select: {
                id: true,
                nombre: true,
                logo: true,
                sector: true
              }
            },
            _count: {
              select: { likes: true, comentarios: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const posts = likes.map(l => ({
      ...l.post,
      content: l.post.contenido,
      image: l.post.imagenUrl,
      likesCount: l.post._count.likes,
      commentsCount: l.post._count.comentarios,
      isLiked: true,
      author: l.post.usuario || l.post.empresa,
      likedAt: l.createdAt
    }));

    return res.json(posts);
  } catch (err) {
    console.error("getLikedPostsByUser:", err);
    return res.status(500).json({ error: "Error al obtener posts con like" });
  }
};
