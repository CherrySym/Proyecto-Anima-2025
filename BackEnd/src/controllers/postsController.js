// src/controllers/postsController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Crear un nuevo post
 * El autor puede ser Usuario o Empresa (determinado por req.user.tipo)
 */
export const createPost = async (req, res) => {
  try {
    const { contenido, imagenUrl } = req.body;
    const userId = req.user?.id;
    // Compatibilidad: usar tipoUsuario si existe, sino tipo
    const tipoUsuario = req.user?.tipoUsuario || req.user?.tipo;

    console.log('🆕 createPost called:', { userId, tipoUsuario, tipo: req.user?.tipo, contenido: contenido?.substring(0, 50) });

    if (!contenido) {
      return res.status(400).json({ error: "El contenido es obligatorio" });
    }

    if (!userId || !tipoUsuario) {
      console.error('❌ createPost: Missing userId or tipoUsuario:', { userId, tipoUsuario });
      return res.status(401).json({ error: "Debes iniciar sesión" });
    }

    // Determinar si es usuario o empresa
    const isUsuario = tipoUsuario === 'USUARIO';
    
    const post = await prisma.post.create({
      data: {
        contenido,
        imagenUrl,
        ...(isUsuario 
          ? { usuarioId: userId }
          : { empresaId: userId }
        )
      },
      include: {
        usuario: isUsuario ? {
          select: {
            id: true,
            nombre: true,
            avatar: true,
            tipo: true
          }
        } : false,
        empresa: !isUsuario ? {
          select: {
            id: true,
            nombre: true,
            logo: true,
            sector: true
          }
        } : false
      }
    });

    return res.status(201).json({
      ...post,
      content: post.contenido, // Alias para frontend
      image: post.imagenUrl, // Alias para frontend
      autorTipo: post.usuarioId ? 'Usuario' : 'Empresa', // Calculado dinámicamente
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      author: post.usuario || post.empresa
    });
  } catch (err) {
    console.error("createPost:", err);
    return res.status(500).json({ error: "Error al crear post" });
  }
};

/**
 * Obtener feed de posts con paginación
 * Incluye likes count, comments count, isLiked
 */
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 20, tipoAutor } = req.query;
    const userId = req.user?.id;
    
    console.log('📍 getPosts llamado:', { 
      userId, 
      hasUser: !!req.user, 
      userKeys: req.user ? Object.keys(req.user) : 'no user',
      tipoUsuario: req.user?.tipoUsuario 
    });

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Filtros opcionales
    const where = {};
    // Filtrar por tipo de autor usando los campos existentes
    if (tipoAutor === 'usuario') {
      where.usuarioId = { not: null };
    } else if (tipoAutor === 'empresa') {
      where.empresaId = { not: null };
    }

    const posts = await prisma.post.findMany({
      where,
      skip,
      take: parseInt(limit),
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
          select: {
            likes: true,
            comentarios: true
          }
        },
        // Si hay usuario logueado, verificar si le dio like
        ...(userId && {
          likes: {
            where: { usuarioId: userId },
            select: { id: true }
          }
        })
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transformar respuesta
    const postsTransformados = posts.map(p => {
      const isLiked = userId ? p.likes?.length > 0 : false;
      console.log(`📊 Post ${p.id}: userId=${userId}, likes array length=${p.likes?.length}, isLiked=${isLiked}`);
      
      return {
        id: p.id,
        contenido: p.contenido,
        content: p.contenido, // Alias para frontend
        imagenUrl: p.imagenUrl,
        image: p.imagenUrl, // Alias para frontend
        autorTipo: p.usuarioId ? 'Usuario' : 'Empresa', // Calculado dinámicamente
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        likesCount: p._count.likes,
        commentsCount: p._count.comentarios,
        isLiked,
        author: p.usuario || p.empresa,
        authorName: p.usuario?.nombre || p.empresa?.nombre,
        authorAvatar: p.usuario?.avatar || p.empresa?.logo
      };
    });

    return res.json(postsTransformados);
  } catch (err) {
    console.error("getPosts:", err);
    return res.status(500).json({ error: "Error al obtener posts" });
  }
};

/**
 * Obtener un post por ID con todos sus comentarios
 */
export const getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;

    const post = await prisma.post.findUnique({
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
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true,
            sector: true
          }
        },
        comentarios: {
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
          where: { parentId: null }, // Solo comentarios principales
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            likes: true,
            comentarios: true
          }
        },
        ...(userId && {
          likes: {
            where: { usuarioId: userId },
            select: { id: true }
          }
        })
      }
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    return res.json({
      id: post.id,
      contenido: post.contenido,
      content: post.contenido, // Alias
      imagenUrl: post.imagenUrl,
      image: post.imagenUrl, // Alias
      autorTipo: post.usuarioId ? 'Usuario' : 'Empresa', // Calculado dinámicamente
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likesCount: post._count.likes,
      commentsCount: post._count.comentarios,
      isLiked: userId ? post.likes?.length > 0 : false,
      author: post.usuario || post.empresa,
      comentarios: post.comentarios
    });
  } catch (err) {
    console.error("getPostById:", err);
    return res.status(500).json({ error: "Error al obtener post" });
  }
};

/**
 * Actualizar un post (solo el autor)
 */
export const updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { contenido, imagenUrl } = req.body;
    const userId = req.user?.id;

    // Verificar que el post existe y pertenece al usuario
    const post = await prisma.post.findUnique({
      where: { id },
      select: { usuarioId: true, empresaId: true }
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    const esAutor = post.usuarioId === userId || post.empresaId === userId;
    if (!esAutor) {
      return res.status(403).json({ error: "No tienes permiso para editar este post" });
    }

    // Actualizar
    const postActualizado = await prisma.post.update({
      where: { id },
      data: {
        ...(contenido && { contenido }),
        ...(imagenUrl !== undefined && { imagenUrl })
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
    });

    return res.json({
      ...postActualizado,
      content: postActualizado.contenido,
      image: postActualizado.imagenUrl,
      likesCount: postActualizado._count.likes,
      commentsCount: postActualizado._count.comentarios,
      author: postActualizado.usuario || postActualizado.empresa
    });
  } catch (err) {
    console.error("updatePost:", err);
    return res.status(500).json({ error: "Error al actualizar post" });
  }
};

/**
 * Eliminar un post (solo el autor o admin)
 */
export const deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;
    const userRol = req.user?.rol;

    // Verificar que el post existe y pertenece al usuario
    const post = await prisma.post.findUnique({
      where: { id },
      select: { usuarioId: true, empresaId: true }
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    const esAutor = post.usuarioId === userId || post.empresaId === userId;
    if (!esAutor && userRol !== 'ADMIN') {
      return res.status(403).json({ error: "No tienes permiso para eliminar este post" });
    }

    // Eliminar (elimina en cascada likes y comentarios)
    await prisma.post.delete({ where: { id } });

    return res.json({
      success: true,
      message: "Post eliminado correctamente"
    });
  } catch (err) {
    console.error("deletePost:", err);
    return res.status(500).json({ error: "Error al eliminar post" });
  }
};

/**
 * Obtener posts de un usuario específico
 */
export const getPostsByUsuario = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const currentUserId = req.user?.id;

    const posts = await prisma.post.findMany({
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
        _count: {
          select: { likes: true, comentarios: true }
        },
        ...(currentUserId && {
          likes: {
            where: { usuarioId: currentUserId },
            select: { id: true }
          }
        })
      },
      orderBy: { createdAt: 'desc' }
    });

    const postsTransformados = posts.map(p => ({
      ...p,
      content: p.contenido,
      image: p.imagenUrl,
      likesCount: p._count.likes,
      commentsCount: p._count.comentarios,
      isLiked: currentUserId ? p.likes?.length > 0 : false,
      author: p.usuario
    }));

    return res.json(postsTransformados);
  } catch (err) {
    console.error("getPostsByUsuario:", err);
    return res.status(500).json({ error: "Error al obtener posts del usuario" });
  }
};

/**
 * Obtener posts de una empresa específica
 */
export const getPostsByEmpresa = async (req, res) => {
  try {
    const empresaId = parseInt(req.params.empresaId);
    const currentUserId = req.user?.id;

    const posts = await prisma.post.findMany({
      where: { empresaId },
      include: {
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
        },
        ...(currentUserId && {
          likes: {
            where: { usuarioId: currentUserId },
            select: { id: true }
          }
        })
      },
      orderBy: { createdAt: 'desc' }
    });

    const postsTransformados = posts.map(p => ({
      ...p,
      content: p.contenido,
      image: p.imagenUrl,
      likesCount: p._count.likes,
      commentsCount: p._count.comentarios,
      isLiked: currentUserId ? p.likes?.length > 0 : false,
      author: p.empresa
    }));

    return res.json(postsTransformados);
  } catch (err) {
    console.error("getPostsByEmpresa:", err);
    return res.status(500).json({ error: "Error al obtener posts de la empresa" });
  }
};
