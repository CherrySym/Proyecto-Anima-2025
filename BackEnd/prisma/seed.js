// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes (opcional - comentar si no quieres borrar)
  await prisma.comentario.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.postulacion.deleteMany();
  await prisma.oferta.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.empresa.deleteMany();

  console.log('✅ Base de datos limpiada');

  // Hash de contraseña para todos los usuarios de prueba
  const passwordHash = await bcrypt.hash('password123', 10);

  // ==================== USUARIOS ====================
  console.log('👤 Creando usuarios...');

  const usuario1 = await prisma.usuario.create({
    data: {
      nombre: 'María González',
      email: 'maria@example.com',
      password: passwordHash,
      fechaNacimiento: new Date('2002-05-15'), // 23 años - JOVEN
      tipo: 'JOVEN',
      rol: 'USUARIO',
      avatar: '/img/usuario.png',
      bio: 'Estudiante de Marketing Digital apasionada por las redes sociales y el branding. Buscando mi primera oportunidad laboral 🚀',
      ubicacion: 'Montevideo, Uruguay',
      puntos: 120
    }
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nombre: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      password: passwordHash,
      fechaNacimiento: new Date('2003-08-22'), // 22 años - JOVEN
      tipo: 'JOVEN',
      rol: 'USUARIO',
      avatar: '/img/usuario.png',
      bio: 'Desarrollador frontend junior. Conocimientos en React, JavaScript y diseño web. ¡Listo para aprender!',
      ubicacion: 'Buenos Aires, Argentina',
      puntos: 85
    }
  });

  const usuario3 = await prisma.usuario.create({
    data: {
      nombre: 'Ana Martínez',
      email: 'ana@example.com',
      password: passwordHash,
      fechaNacimiento: new Date('2008-03-10'), // 17 años - ADOLESCENTE
      tipo: 'ADOLESCENTE',
      rol: 'USUARIO',
      avatar: '/img/usuario.png',
      bio: 'Estudiante de secundaria interesada en diseño gráfico y redes sociales 🎨',
      ubicacion: 'Santiago, Chile',
      puntos: 45
    }
  });

  const adminUser = await prisma.usuario.create({
    data: {
      nombre: 'Admin Sistema',
      email: 'admin@nexo.com',
      password: passwordHash,
      fechaNacimiento: new Date('1995-01-01'), // 30 años - JOVEN (pero admin)
      tipo: 'JOVEN',
      rol: 'ADMIN',
      avatar: '/img/usuario.png',
      bio: 'Administrador del sistema Nexo',
      ubicacion: 'Montevideo, Uruguay',
      puntos: 500
    }
  });

  console.log(`✅ ${4} usuarios creados`);

  // ==================== EMPRESAS ====================
  console.log('🏢 Creando empresas...');

  const empresa1 = await prisma.empresa.create({
    data: {
      nombre: 'Globant',
      email: 'rrhh@globant.com',
      password: passwordHash,
      descripcion: 'Somos una compañía nativa digital que ayuda a organizaciones a reinventarse y desbloquear su potencial.',
      logo: '/img/globant.jpg',
      sector: 'Tecnología',
      ubicacion: 'Montevideo, Uruguay'
    }
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      nombre: 'MercadoLibre',
      email: 'careers@mercadolibre.com',
      password: passwordHash,
      descripcion: 'Líder en e-commerce y fintech en América Latina. Democratizamos el comercio y los servicios financieros.',
      logo: '/img/MerL.png',
      sector: 'E-commerce / Fintech',
      ubicacion: 'Buenos Aires, Argentina'
    }
  });

  const empresa3 = await prisma.empresa.create({
    data: {
      nombre: 'Conaprole',
      email: 'trabajo@conaprole.com.uy',
      password: passwordHash,
      descripcion: 'Cooperativa Nacional de Productores de Leche. Principal empresa láctea de Uruguay.',
      logo: '/img/Conaprole.png',
      sector: 'Industria Alimentaria',
      ubicacion: 'Montevideo, Uruguay'
    }
  });

  console.log(`✅ ${3} empresas creadas`);

  // ==================== OFERTAS LABORALES ====================
  console.log('💼 Creando ofertas laborales...');

  const oferta1 = await prisma.oferta.create({
    data: {
      empresaId: empresa1.id,
      titulo: 'Desarrollador Frontend Junior',
      descripcion: 'Buscamos un desarrollador frontend junior con ganas de aprender y crecer en un ambiente dinámico. Trabajarás con tecnologías modernas y equipos ágiles.\n\n**Responsabilidades:**\n• Desarrollar interfaces de usuario atractivas y funcionales\n• Colaborar con diseñadores UX/UI para implementar mockups\n• Escribir código limpio, mantenible y bien documentado\n• Participar en revisiones de código y reuniones de equipo\n• Aprender nuevas tecnologías y metodologías de desarrollo\n• Optimizar el rendimiento de aplicaciones web\n• Implementar pruebas unitarias y de integración\n• Mantener documentación técnica actualizada\n• Trabajar en equipo usando metodologías ágiles\n• Resolver bugs y problemas técnicos\n\n**Requisitos Técnicos:**\n• Experiencia mínima de 1 año en desarrollo frontend\n• Dominio de HTML5, CSS3 y JavaScript ES6+\n• Conocimiento sólido de React y sus ecosistemas\n• Familiaridad con herramientas de build (Webpack, Vite)\n• Experiencia con sistemas de control de versiones (Git)\n• Conocimientos de responsive design y mobile-first\n• Comprensión de principios de accesibilidad web\n• Experiencia con APIs RESTful\n\n**Beneficios:**\n• Horarios flexibles y trabajo remoto opcional\n• Capacitaciones y cursos pagos por la empresa\n• Ambiente de trabajo joven y dinámico\n• Posibilidades de crecimiento profesional\n• Snacks y almuerzo en la oficina\n• Seguro médico privado\n• Días de vacaciones adicionales\n• Budget para equipamiento y home office\n• Eventos y actividades de team building\n• Acceso a conferencias y meetups tecnológicos\n\n**Proceso de Selección:**\n• Entrevista inicial con RRHH (30 minutos)\n• Prueba técnica para resolver en casa (2-3 horas)\n• Entrevista técnica con el equipo de desarrollo (1 hora)\n• Entrevista final con el CTO (30 minutos)\n• Propuesta y onboarding',
      ubicacion: 'Montevideo, Uruguay',
      salario: '$40,000 - $60,000 UYU',
      tipo: 'Tiempo completo',
      area: 'tecnologia',
      modalidad: 'Híbrido',
      requisitos: '• Conocimientos básicos de HTML, CSS, JavaScript\n• React (deseable)\n• Git y control de versiones\n• Inglés intermedio\n• Pasión por aprender',
      activa: true,
      fechaVencimiento: new Date('2025-12-31')
    }
  });

  const oferta2 = await prisma.oferta.create({
    data: {
      empresaId: empresa2.id,
      titulo: 'Analista de Marketing Digital Junior',
      descripcion: 'Únete a nuestro equipo de marketing digital para ayudarnos a crear campañas innovadoras en redes sociales y e-commerce.\n\n**Responsabilidades:**\n• Crear y gestionar contenido para redes sociales (Instagram, Facebook, TikTok, LinkedIn)\n• Diseñar estrategias de marketing digital alineadas con objetivos comerciales\n• Analizar métricas y KPIs de campañas digitales\n• Colaborar con el equipo de diseño para crear piezas gráficas\n• Gestionar presupuestos de publicidad digital\n• Realizar investigación de mercado y análisis de competencia\n• Optimizar campañas de email marketing\n• Coordinar con influencers y partners digitales\n• Crear reportes mensuales de performance\n• Mantenerse actualizado con tendencias de marketing digital\n\n**Requisitos:**\n• Estudiante o recién graduado en Marketing, Comunicación o afines\n• Conocimiento profundo de redes sociales y sus algoritmos\n• Google Analytics y herramientas de análisis web\n• Experiencia con Meta Business Suite y Google Ads (deseable)\n• Habilidades de copywriting y storytelling\n• Conocimientos básicos de diseño (Canva, Adobe Creative Suite)\n• Capacidad analítica y orientación a resultados\n• Creatividad y pensamiento innovador\n• Excelente comunicación escrita y verbal\n\n**Beneficios:**\n• Trabajo 100% remoto\n• Horarios flexibles\n• Presupuesto para cursos y certificaciones\n• Acceso a herramientas premium de marketing\n• Días libres por cumpleaños\n• Ambiente colaborativo y creativo\n• Oportunidades de crecimiento rápido\n• Bonos por performance',
      ubicacion: 'Buenos Aires, Argentina',
      salario: '$80,000 - $120,000 ARS',
      tipo: 'Medio tiempo',
      area: 'marketing',
      modalidad: 'Remoto',
      requisitos: '• Estudiante o recién graduado en Marketing, Comunicación o afines\n• Conocimiento de redes sociales\n• Google Analytics (deseable)\n• Creatividad y proactividad',
      activa: true,
      fechaVencimiento: new Date('2025-11-30')
    }
  });

  const oferta3 = await prisma.oferta.create({
    data: {
      empresaId: empresa1.id,
      titulo: 'QA Tester - Programa Trainee',
      descripcion: 'Programa trainee de 3 meses para formar QA testers. No se requiere experiencia previa, solo muchas ganas de aprender.',
      ubicacion: 'Montevideo, Uruguay',
      salario: '$35,000 - $45,000 UYU',
      tipo: 'Trainee',
      area: 'tecnologia',
      modalidad: 'Presencial',
      requisitos: '• Sin experiencia previa requerida\n• Atención al detalle\n• Capacidad analítica\n• Trabajo en equipo\n• Disponibilidad completa',
      activa: true,
      fechaVencimiento: new Date('2025-10-31')
    }
  });

  const oferta4 = await prisma.oferta.create({
    data: {
      empresaId: empresa3.id,
      titulo: 'Asistente Administrativo',
      descripcion: 'Buscamos asistente administrativo para apoyar en tareas de gestión documental, atención telefónica y apoyo general.',
      ubicacion: 'Montevideo, Uruguay',
      salario: '$30,000 - $40,000 UYU',
      tipo: 'Tiempo completo',
      area: 'administracion',
      modalidad: 'Presencial',
      requisitos: '• Bachillerato completo\n• Manejo de Office (Word, Excel)\n• Buena comunicación\n• Organización y responsabilidad',
      activa: true,
      fechaVencimiento: new Date('2025-11-15')
    }
  });

  const oferta5 = await prisma.oferta.create({
    data: {
      empresaId: empresa2.id,
      titulo: 'Desarrollador Backend Node.js',
      descripcion: 'Desarrollador backend para trabajar en microservicios y APIs REST. Experiencia mínima de 1 año.',
      ubicacion: 'Buenos Aires, Argentina',
      salario: '$150,000 - $200,000 ARS',
      tipo: 'Tiempo completo',
      area: 'tecnologia',
      modalidad: 'Remoto',
      requisitos: '• Node.js y Express\n• Bases de datos (SQL/NoSQL)\n• APIs REST\n• Git\n• Inglés intermedio-avanzado',
      activa: true,
      fechaVencimiento: new Date('2026-01-31')
    }
  });

  console.log(`✅ ${5} ofertas creadas`);

  // ==================== POSTULACIONES ====================
  console.log('📝 Creando postulaciones...');

  await prisma.postulacion.create({
    data: {
      usuarioId: usuario1.id,
      ofertaId: oferta2.id,
      estado: 'PENDIENTE'
    }
  });

  await prisma.postulacion.create({
    data: {
      usuarioId: usuario2.id,
      ofertaId: oferta1.id,
      estado: 'ACEPTADA'
    }
  });

  await prisma.postulacion.create({
    data: {
      usuarioId: usuario2.id,
      ofertaId: oferta3.id,
      estado: 'PENDIENTE'
    }
  });

  console.log(`✅ ${3} postulaciones creadas`);

  // ==================== POSTS ====================
  console.log('📰 Creando posts...');

  const post1 = await prisma.post.create({
    data: {
      usuarioId: usuario1.id,
      contenido: '¡Acabo de completar mi primer curso de Marketing Digital! 🚀 Muy emocionada de aplicar todo lo aprendido. ¿Alguien más está estudiando marketing?',
      imagenUrl: '/img/img1.png'
    }
  });

  const post2 = await prisma.post.create({
    data: {
      empresaId: empresa1.id,
      contenido: '🌟 ¡Nueva oportunidad para jóvenes desarrolladores! Estamos buscando talentos entre 18-25 años para nuestro programa de trainee. ¡Aplica ahora!',
      imagenUrl: null
    }
  });

  const post3 = await prisma.post.create({
    data: {
      usuarioId: usuario2.id,
      contenido: 'Hoy aprendí sobre React Hooks y estoy fascinado con lo poderosos que son. ¿Alguien tiene tips para alguien que recién empieza? 💻',
      imagenUrl: null
    }
  });

  const post4 = await prisma.post.create({
    data: {
      empresaId: empresa2.id,
      contenido: '📦 En MercadoLibre estamos buscando jóvenes talentos para nuestro equipo de marketing digital. Si te apasionan las redes sociales y el e-commerce, ¡esta es tu oportunidad!',
      imagenUrl: '/img/MercLP.jpg'
    }
  });

  const post5 = await prisma.post.create({
    data: {
      usuarioId: usuario1.id,
      contenido: '¡Acabo de postularme a mi primera oferta laboral! Nervios y emoción al mismo tiempo 😊 ¿Algún consejo para una entrevista exitosa?',
      imagenUrl: null
    }
  });

  const post6 = await prisma.post.create({
    data: {
      usuarioId: usuario3.id,
      contenido: 'Diseñé mi primer logo para un proyecto de clase. ¡Qué emocionante es crear algo desde cero! 🎨 #DesignLife',
      imagenUrl: null
    }
  });

  const post7 = await prisma.post.create({
    data: {
      empresaId: empresa3.id,
      contenido: 'En Conaprole valoramos el talento joven uruguayo. Si eres proactivo y quieres crecer en una empresa líder, revisa nuestras oportunidades.',
      imagenUrl: '/img/ConaproleSh.png'
    }
  });

  const post8 = await prisma.post.create({
    data: {
      usuarioId: usuario2.id,
      contenido: '¡Gran noticia! Me aceptaron en el programa trainee de Globant 🎉 Gracias a todos los que me apoyaron en este proceso.',
      imagenUrl: null
    }
  });

  console.log(`✅ ${8} posts creados`);

  // ==================== LIKES ====================
  console.log('❤️ Creando likes...');

  await prisma.like.create({
    data: { postId: post1.id, usuarioId: usuario2.id }
  });

  await prisma.like.create({
    data: { postId: post1.id, usuarioId: usuario3.id }
  });

  await prisma.like.create({
    data: { postId: post2.id, usuarioId: usuario1.id }
  });

  await prisma.like.create({
    data: { postId: post2.id, usuarioId: usuario2.id }
  });

  await prisma.like.create({
    data: { postId: post3.id, usuarioId: usuario1.id }
  });

  await prisma.like.create({
    data: { postId: post5.id, usuarioId: usuario2.id }
  });

  await prisma.like.create({
    data: { postId: post8.id, usuarioId: usuario1.id }
  });

  await prisma.like.create({
    data: { postId: post8.id, usuarioId: usuario3.id }
  });

  console.log(`✅ ${8} likes creados`);

  // ==================== COMENTARIOS ====================
  console.log('💬 Creando comentarios...');

  const comentario1 = await prisma.comentario.create({
    data: {
      postId: post1.id,
      usuarioId: usuario2.id,
      contenido: '¡Felicitaciones María! Yo también estoy estudiando marketing. ¿Qué curso hiciste?',
      parentId: null
    }
  });

  await prisma.comentario.create({
    data: {
      postId: post1.id,
      usuarioId: usuario1.id,
      contenido: 'Gracias Carlos! Hice el de Google Digital Garage, súper recomendado 😊',
      parentId: comentario1.id // Respuesta al comentario anterior
    }
  });

  await prisma.comentario.create({
    data: {
      postId: post3.id,
      usuarioId: usuario1.id,
      contenido: 'Los hooks son geniales! Te recomiendo empezar con useState y useEffect, son los más usados.',
      parentId: null
    }
  });

  await prisma.comentario.create({
    data: {
      postId: post5.id,
      usuarioId: usuario2.id,
      contenido: '¡Mucha suerte! Mi consejo: sé tú mismo/a, investiga sobre la empresa y prepara preguntas para hacerles.',
      parentId: null
    }
  });

  await prisma.comentario.create({
    data: {
      postId: post8.id,
      usuarioId: usuario1.id,
      contenido: '¡¡¡Felicitaciones Carlos!!! Te lo mereces, trabajaste duro para esto 🎉',
      parentId: null
    }
  });

  console.log(`✅ ${5} comentarios creados`);

  // ==================== RESUMEN ====================
  console.log('\n📊 RESUMEN DEL SEED:');
  console.log(`   👤 Usuarios: 4 (3 regulares + 1 admin)`);
  console.log(`   🏢 Empresas: 3`);
  console.log(`   💼 Ofertas: 5`);
  console.log(`   📝 Postulaciones: 3`);
  console.log(`   📰 Posts: 8`);
  console.log(`   ❤️ Likes: 8`);
  console.log(`   💬 Comentarios: 5`);
  console.log('\n✅ Seed completado exitosamente!');
  console.log('\n📝 CREDENCIALES DE PRUEBA:');
  console.log('   Usuario: maria@example.com / password123');
  console.log('   Usuario: carlos@example.com / password123');
  console.log('   Adolescente: ana@example.com / password123');
  console.log('   Admin: admin@nexo.com / password123');
  console.log('   Empresa: rrhh@globant.com / password123');
  console.log('   Empresa: careers@mercadolibre.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
