# 📚 GUÍA DE COMPONENTES COMUNES - JobPath

**Fecha de creación:** 10 de octubre de 2025  
**Versión:** 1.0.0

---

## 📋 Índice

1. [Introducción](#introducción)
2. [Sistema de Botones](#sistema-de-botones)
3. [Componente Button](#componente-button)
4. [Componente Card](#componente-card)
5. [Componente LoadingSpinner](#componente-loadingspinner)
6. [Componente BackButton](#componente-backbutton)
7. [Componente LanguageSelector](#componente-languageselector)
8. [Variables CSS Globales](#variables-css-globales)
9. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Introducción

Este documento describe los componentes comunes reutilizables creados para el proyecto JobPath. Estos componentes garantizan **consistencia visual** y **mantenibilidad** en toda la aplicación.

### Ubicación de los componentes

```
/FrontEnd/src/components/common/
  ├── Button.jsx
  ├── Card.jsx
  ├── LoadingSpinner.jsx
  ├── BackButton.jsx
  ├── LanguageSelector.jsx
  ├── LanguageSelector.css
  └── index.js (barrel export)
```

### Importación

```jsx
// Importar componentes individuales
import { Button, Card, LoadingSpinner } from '../../components/common';

// O importar uno específico
import Button from '../../components/common/Button';
```

---

## 🔘 Sistema de Botones

El proyecto usa un **sistema unificado de botones** definido en `App.css`. Todos los botones usan las mismas clases base para garantizar consistencia.

### Variantes disponibles

| Variante | Uso | Ejemplo visual |
|----------|-----|----------------|
| `primary` | Acción principal | Fondo azul gradient |
| `secondary` | Acción secundaria | Fondo verde |
| `outline` | Acción terciaria | Borde azul, fondo transparente |
| `ghost` | Acción sutil | Sin borde, hover gris |
| `danger` | Eliminar/cancelar | Fondo rojo |
| `warning` | Advertencia | Fondo naranja |
| `success` | Confirmación | Fondo verde |
| `back` | Volver atrás | Borde gris, compacto |

### Tamaños

- `sm` - Pequeño (32px altura)
- `md` - Mediano (40px altura) **[default]**
- `lg` - Grande (48px altura)

---

## 🔘 Componente Button

### Descripción

Componente de botón reutilizable con múltiples variantes y estados.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | node | - | Contenido del botón |
| `variant` | string | `'primary'` | Variante visual del botón |
| `size` | string | `'md'` | Tamaño del botón |
| `icon` | node | `null` | Icono a mostrar |
| `iconPosition` | string | `'left'` | Posición del icono |
| `disabled` | boolean | `false` | Deshabilitar botón |
| `loading` | boolean | `false` | Mostrar estado de carga |
| `block` | boolean | `false` | Ancho completo |
| `onClick` | function | - | Manejador de click |
| `type` | string | `'button'` | Tipo de botón HTML |

### Ejemplos de uso

```jsx
// Botón primario básico
<Button variant="primary" onClick={handleSubmit}>
  Enviar
</Button>

// Botón con icono
<Button variant="secondary" icon={<span>📄</span>}>
  Descargar PDF
</Button>

// Botón de carga
<Button variant="primary" loading>
  Guardando...
</Button>

// Botón deshabilitado
<Button variant="danger" disabled>
  Eliminar
</Button>

// Botón de ancho completo
<Button variant="primary" block>
  Continuar
</Button>

// Botón con tamaño pequeño
<Button variant="outline" size="sm">
  Cancelar
</Button>

// Botón solo con icono
<Button variant="ghost" icon={<span>❤️</span>} />
```

---

## 🎴 Componente Card

### Descripción

Tarjeta reutilizable para contener contenido con estilos consistentes.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | node | **requerido** | Contenido de la tarjeta |
| `hoverable` | boolean | `false` | Efecto hover elevado |
| `shadow` | string | `'sm'` | Tamaño de sombra |
| `padding` | string | `'lg'` | Espaciado interno |
| `onClick` | function | - | Hacer clickeable |
| `className` | string | `''` | Clases CSS adicionales |
| `style` | object | `{}` | Estilos inline |

### Ejemplos de uso

```jsx
// Tarjeta básica
<Card>
  <h3>Título</h3>
  <p>Contenido de la tarjeta</p>
</Card>

// Tarjeta con hover
<Card hoverable shadow="md">
  <h3>Oferta de trabajo</h3>
  <p>Desarrollador Full Stack</p>
</Card>

// Tarjeta clickeable
<Card onClick={() => navigate('/detalle')} hoverable>
  <h3>Click para ver más</h3>
</Card>

// Tarjeta con padding personalizado
<Card padding="sm" shadow="lg">
  <p>Contenido compacto</p>
</Card>
```

---

## ⏳ Componente LoadingSpinner

### Descripción

Spinner de carga consistente para estados de carga.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | string | `'md'` | Tamaño del spinner |
| `message` | string | `''` | Mensaje bajo el spinner |
| `centered` | boolean | `true` | Centrar verticalmente |
| `className` | string | `''` | Clases CSS adicionales |

### Ejemplos de uso

```jsx
// Spinner básico centrado
<LoadingSpinner message="Cargando ofertas..." />

// Spinner pequeño inline
<LoadingSpinner size="sm" centered={false} />

// Spinner grande con mensaje
<LoadingSpinner 
  size="lg" 
  message="Procesando tu solicitud..."
/>
```

---

## ⬅️ Componente BackButton

### Descripción

Botón estandarizado para volver a la página anterior.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `to` | string | `null` | Ruta específica (opcional) |
| `label` | string | `'← Volver'` | Texto del botón |
| `onClick` | function | `null` | Manejador personalizado |
| `className` | string | `''` | Clases CSS adicionales |

### Ejemplos de uso

```jsx
// Volver a página anterior
<BackButton />

// Volver a ruta específica
<BackButton to="/home" label="Volver al inicio" />

// Con manejador personalizado
<BackButton onClick={handleCustomBack} />
```

---

## 🌐 Componente LanguageSelector

### Descripción

Selector de idioma unificado (ES/EN) con diseño consistente.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | string | `'default'` | Estilo del selector |
| `className` | string | `''` | Clases CSS adicionales |

### Variantes

- `default` - Botones rectangulares con borde
- `compact` - Versión más pequeña
- `pills` - Botones redondeados en contenedor

### Ejemplos de uso

```jsx
// Selector por defecto
<LanguageSelector />

// Versión compacta
<LanguageSelector variant="compact" />

// Estilo pills
<LanguageSelector variant="pills" />
```

---

## 🎨 Variables CSS Globales

Todas las variables CSS están definidas en `App.css` bajo `:root`.

### Colores principales

```css
--primary-500: #4f4fcf;      /* Azul principal */
--secondary-500: #28a745;    /* Verde secundario */
--accent-500: #e91e63;       /* Rosa acento */
```

### Escala de grises

```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;
```

### Espaciado

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
```

### Tipografía

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
```

### Sombras

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.15);
```

### Uso en componentes

```css
.mi-componente {
  padding: var(--space-md);
  color: var(--primary-500);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  font-size: var(--text-base);
}
```

---

## ✅ Mejores Prácticas

### 1. Usar componentes comunes siempre que sea posible

❌ **Evitar:**
```jsx
<button style={{
  background: '#4f4fcf',
  padding: '10px 20px',
  borderRadius: '8px'
}}>
  Click me
</button>
```

✅ **Preferir:**
```jsx
<Button variant="primary">
  Click me
</Button>
```

### 2. Usar variables CSS en lugar de valores hardcoded

❌ **Evitar:**
```css
.mi-clase {
  color: #6b7280;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

✅ **Preferir:**
```css
.mi-clase {
  color: var(--gray-500);
  padding: var(--space-md);
  box-shadow: var(--shadow-md);
}
```

### 3. Mantener consistencia en tamaños

Usar siempre los tamaños predefinidos:
- Botones: `sm`, `md`, `lg`
- Spinners: `sm`, `md`, `lg`
- Espaciado: `xs`, `sm`, `md`, `lg`, `xl`

### 4. Agrupar botones con clases utility

```jsx
<div className="btn-group">
  <Button variant="outline">Cancelar</Button>
  <Button variant="primary">Guardar</Button>
</div>
```

### 5. Usar LoadingSpinner en estados de carga

❌ **Evitar:**
```jsx
{loading && <div>Cargando...</div>}
```

✅ **Preferir:**
```jsx
{loading && <LoadingSpinner message="Cargando datos..." />}
```

---

## 🔧 Personalización

### Extender componentes

Si necesitas personalizar un componente:

```jsx
import Button from '../../components/common/Button';

const CustomButton = (props) => {
  return (
    <Button 
      {...props}
      className={`mi-clase-custom ${props.className || ''}`}
    />
  );
};
```

### Agregar variantes nuevas

Edita `App.css` y agrega la nueva clase:

```css
.btn-custom {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
}
```

Luego actualiza `Button.jsx` para incluir la nueva variante en PropTypes.

---

## 📊 Comparación: Antes vs Después

### Antes de la refactorización

- ❌ 15+ archivos con estilos de botones duplicados
- ❌ ~500 líneas de CSS duplicado
- ❌ Inconsistencia visual entre páginas
- ❌ Difícil de mantener
- ❌ console.log en producción

### Después de la refactorización

- ✅ Sistema unificado de botones
- ✅ 5 componentes comunes reutilizables
- ✅ Variables CSS globales documentadas
- ✅ Reducción de ~40% en código CSS
- ✅ Consistencia visual total
- ✅ Código limpio y profesional

---

## 🚀 Próximos Pasos

### Componentes a crear (opcional):

1. **Input** - Campo de entrada reutilizable
2. **Select** - Selector dropdown
3. **Modal** - Ventana modal
4. **Toast** - Notificaciones
5. **Badge** - Insignias de estado
6. **Avatar** - Imagen de perfil circular
7. **Tooltip** - Tooltips informativos

---

## 📞 Contacto y Soporte

Para dudas o sugerencias sobre estos componentes, revisar:
- `AUDITORIA_COMPLETA.md` - Análisis detallado del proyecto
- `App.css` - Variables y sistema de estilos
- Código fuente en `/components/common/`

---

**Última actualización:** 10 de octubre de 2025  
**Mantenedor:** Equipo JobPath  
**Versión de React:** 18.x
