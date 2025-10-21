// src/controllers/ofertasController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Crear oferta con nuevos campos del MVP
 * Requiere autenticación de empresa
 */
export const createOferta = async (req, res) => {
  try {
    const { 
      titulo, 
      descripcion, 
      ubicacion,
      salario,
      tipo,              // Nuevo: "Tiempo completo", "Medio tiempo", "Trainee"
      area,              // Nuevo: "tecnologia", "marketing", "ventas"
      modalidad,         // Nuevo: "Presencial", "Remoto", "Híbrido"
      requisitos,        // Nuevo: requisitos del puesto
      fechaVencimiento   // Nuevo: fecha límite
    } = req.body;

    // Validaciones básicas
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: "Título y descripción son obligatorios" });
    }

    // Obtener empresaId desde req.user (viene del authMiddleware)
    const empresaId = req.user?.id;
    if (!empresaId) {
      return res.status(401).json({ error: "Debes iniciar sesión como empresa" });
    }

    // Crear oferta con nuevo schema
    const oferta = await prisma.oferta.create({
      data: { 
        empresaId,
        titulo,
        descripcion,
        ubicacion,
        salario,
        tipo,
        area,
        modalidad,
        requisitos,
        fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
        activa: true
      },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true,
            sector: true,
            ubicacion: true
          }
        }
      }
    });

    return res.status(201).json({
      message: "Oferta creada exitosamente",
      oferta: {
        ...oferta,
        fechaPublicacion: oferta.createdAt, // Alias para frontend
        empresa_info: oferta.empresa // Alias para frontend
      }
    });
  } catch (err) {
    console.error("createOferta:", err);
    return res.status(500).json({ error: "Error al crear oferta" });
  }
};

/**
 * Obtener todas las ofertas con filtros
 * Devuelve información completa de la empresa y contadores
 */
export const getOfertas = async (req, res) => {
  try {
    const { area, tipo, modalidad, activa = 'true' } = req.query;

    // Construir filtros dinámicamente
    const filtros = {
      activa: activa === 'true'
    };

    if (area && area !== 'todas') {
      filtros.area = area;
    }

    if (tipo) {
      filtros.tipo = tipo;
    }

    if (modalidad) {
      filtros.modalidad = modalidad;
    }

    const ofertas = await prisma.oferta.findMany({
      where: filtros,
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true,
            sector: true,
            ubicacion: true
          }
        },
        _count: {
          select: { postulaciones: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transformar respuesta para frontend
    const ofertasTransformadas = ofertas.map(oferta => ({
      id: oferta.id,
      titulo: oferta.titulo,
      empresa: oferta.empresa.nombre,
      empresaId: oferta.empresaId,
      descripcion: oferta.descripcion,
      ubicacion: oferta.ubicacion,
      salario: oferta.salario,
      tipo: oferta.tipo,
      area: oferta.area,
      modalidad: oferta.modalidad,
      requisitos: oferta.requisitos,
      activa: oferta.activa,
      fechaPublicacion: oferta.createdAt,
      fechaVencimiento: oferta.fechaVencimiento,
      empresa_info: oferta.empresa,
      totalPostulaciones: oferta._count.postulaciones
    }));

    return res.json(ofertasTransformadas);
  } catch (err) {
    console.error("getOfertas:", err);
    return res.status(500).json({ error: "Error al obtener ofertas" });
  }
};

/**
 * Obtener oferta por ID con información completa
 */
export const getOfertaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarioId = req.user?.id; // Viene de optionalAuthMiddleware
    
    const oferta = await prisma.oferta.findUnique({ 
      where: { id },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true,
            sector: true,
            ubicacion: true,
            descripcion: true
          }
        },
        _count: {
          select: { postulaciones: true }
        },
        // Si hay usuario logueado, verificar si ya se postuló
        ...(usuarioId && {
          postulaciones: {
            where: { usuarioId },
            select: { id: true }
          }
        })
      }
    });

    if (!oferta) {
      return res.status(404).json({ error: "Oferta no encontrada" });
    }

    // Verificar si el usuario ya se postuló
    const yaPostulado = usuarioId ? oferta.postulaciones?.length > 0 : false;

    // Transformar respuesta
    const ofertaTransformada = {
      id: oferta.id,
      titulo: oferta.titulo,
      empresa: oferta.empresa.nombre,
      empresaId: oferta.empresaId,
      descripcion: oferta.descripcion,
      ubicacion: oferta.ubicacion,
      salario: oferta.salario,
      tipo: oferta.tipo,
      area: oferta.area,
      modalidad: oferta.modalidad,
      requisitos: oferta.requisitos,
      activa: oferta.activa,
      fechaPublicacion: oferta.createdAt,
      fechaVencimiento: oferta.fechaVencimiento,
      yaPostulado, // Nuevo campo
      empresa_info: {
        nombre: oferta.empresa.nombre,
        descripcion: oferta.empresa.descripcion,
        logo: oferta.empresa.logo,
        sector: oferta.empresa.sector,
        ubicacion: oferta.empresa.ubicacion,
        empleados: '50-100' // Mock - agregar al schema si es necesario
      },
      totalPostulaciones: oferta._count.postulaciones
    };

    return res.json(ofertaTransformada);
  } catch (err) {
    console.error("getOfertaById:", err);
    return res.status(500).json({ error: "Error al obtener oferta" });
  }
};

/**
 * Actualizar oferta
 * Solo la empresa que la creó puede actualizarla
 */
export const updateOferta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const empresaId = req.user?.id;

    // Verificar que la oferta pertenece a la empresa
    const ofertaExistente = await prisma.oferta.findUnique({
      where: { id },
      select: { empresaId: true }
    });

    if (!ofertaExistente) {
      return res.status(404).json({ error: "Oferta no encontrada" });
    }

    if (ofertaExistente.empresaId !== empresaId) {
      return res.status(403).json({ error: "No tienes permiso para editar esta oferta" });
    }

    // Actualizar oferta
    const { fechaVencimiento, ...otrosCampos } = req.body;
    
    const oferta = await prisma.oferta.update({
      where: { id },
      data: {
        ...otrosCampos,
        ...(fechaVencimiento && { fechaVencimiento: new Date(fechaVencimiento) })
      },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true,
            sector: true
          }
        }
      }
    });

    return res.json({
      message: "Oferta actualizada",
      oferta: {
        ...oferta,
        fechaPublicacion: oferta.createdAt,
        empresa_info: oferta.empresa
      }
    });
  } catch (err) {
    console.error("updateOferta:", err);
    return res.status(500).json({ error: "Error al actualizar oferta" });
  }
};

/**
 * Obtener todas las ofertas de la empresa autenticada
 */
export const getMisOfertas = async (req, res) => {
  try {
    const empresaId = req.user?.id;

    if (!empresaId) {
      return res.status(401).json({ error: "Debes iniciar sesión como empresa" });
    }

    const ofertas = await prisma.oferta.findMany({
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
          select: {
            postulaciones: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      ofertas: ofertas.map(oferta => ({
        ...oferta,
        fechaPublicacion: oferta.createdAt,
        empresa_info: oferta.empresa,
        numeroPostulaciones: oferta._count.postulaciones
      }))
    });
  } catch (err) {
    console.error("getMisOfertas:", err);
    return res.status(500).json({ error: "Error al obtener ofertas" });
  }
};

/**
 * Borrar oferta (soft delete - marcar como inactiva)
 */
export const deleteOferta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const empresaId = req.user?.id;

    // Verificar que la oferta pertenece a la empresa
    const ofertaExistente = await prisma.oferta.findUnique({
      where: { id },
      select: { empresaId: true }
    });

    if (!ofertaExistente) {
      return res.status(404).json({ error: "Oferta no encontrada" });
    }

    if (ofertaExistente.empresaId !== empresaId) {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta oferta" });
    }

    // Soft delete - marcar como inactiva
    await prisma.oferta.update({
      where: { id },
      data: { activa: false }
    });

    return res.json({ 
      success: true,
      message: "Oferta desactivada exitosamente" 
    });
  } catch (err) {
    console.error("deleteOferta:", err);
    return res.status(500).json({ error: "Error al eliminar oferta" });
  }
};
