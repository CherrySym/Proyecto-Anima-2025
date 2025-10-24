# 📋 Instrucciones de Actualización - JobPath

## ✅ Estado Actual
Todos los cambios están committeados y pusheados a GitHub (commit: `df3342c`).

## 🎯 Problema
Los estilos CSS actualizados no se están aplicando en la VM, aunque el script de actualización se ejecute correctamente.

## 🔍 Configuración Actual
- **Repositorio en VM**: `/opt/Proyecto-Anima-2025`
- **Frontend Build**: `/opt/Proyecto-Anima-2025/FrontEnd/dist/`
- **Nginx sirve desde**: `/opt/Proyecto-Anima-2025/FrontEnd/dist/` (según tu configuración en `/etc/nginx/conf.d/jobpath.conf`)
- **Backend PM2**: Proceso `JobPath-Backend` en puerto 4000

## 📝 Pasos para Actualizar en la VM

### 1. Ejecuta el Script de Actualización
```bash
cd /opt/Proyecto-Anima-2025/deployment
bash actualizar-app.sh
```

Este script automáticamente:
- ✅ Hace `git pull` de los últimos cambios
- ✅ Limpia caché de Vite (`dist/` y `.vite`)
- ✅ Construye el frontend limpio
- ✅ Reinicia el backend con PM2
- ✅ Limpia caché de Nginx
- ✅ Reinicia Nginx

### 2. Verifica que el Build se Generó Correctamente
```bash
ls -lh /opt/Proyecto-Anima-2025/FrontEnd/dist/assets/
```

Deberías ver archivos como:
- `index-BdrV74nU.css` (185 KB)
- `index-Cl8XN-4M.js` (482 KB)

### 3. Verifica que Nginx Está Sirviendo los Archivos Correctos
```bash
curl -I http://localhost/
```

Debería responder con `200 OK`.

### 4. Limpia COMPLETAMENTE el Caché del Navegador

**IMPORTANTE**: Este es el paso más crítico. El navegador guarda caché muy agresivamente.

#### Opción A: Modo Incógnito (Recomendado)
1. Abre una **ventana de incógnito** (Ctrl+Shift+N en Chrome/Edge, Cmd+Shift+N en Safari)
2. Ve a `http://jobpath.anima.edu.uy`

#### Opción B: Recarga Forzada
1. Presiona `Ctrl+Shift+R` (Windows/Linux) o `Cmd+Shift+R` (Mac)
2. Si no funciona, abre DevTools (F12) y:
   - Click derecho en el botón de recarga
   - Selecciona "Empty Cache and Hard Reload"

#### Opción C: Limpieza Manual
En Chrome/Edge:
1. Presiona `F12` para abrir DevTools
2. Ve a la pestaña "Network"
3. Marca la casilla "Disable cache"
4. Recarga la página (F5)

### 5. Verifica los Archivos que se Están Cargando
Con DevTools abierto (F12):
1. Ve a la pestaña "Network"
2. Recarga la página
3. Busca el archivo CSS (debería ser `index-BdrV74nU.css`)
4. Verifica que el "Status" sea `200` (no `304 Not Modified`)

## 🐛 Solución de Problemas

### Si los estilos aún no se aplican:

#### 1. Verifica Permisos de Archivos
```bash
ls -la /opt/Proyecto-Anima-2025/FrontEnd/dist/
```

Los archivos deberían ser legibles por el usuario que corre Nginx (generalmente `nginx` o `www-data`).

#### 2. Verifica Logs de Nginx
```bash
sudo tail -f /var/log/nginx/jobpath.anima.edu.uy.error.log
```

#### 3. Fuerza Reconstrucción Manual
```bash
cd /opt/Proyecto-Anima-2025/FrontEnd
rm -rf dist node_modules/.vite
npm run build
sudo systemctl restart nginx
```

#### 4. Verifica que Nginx Esté Sirviendo Correctamente
```bash
# Ver configuración activa
sudo nginx -t

# Ver qué archivo está sirviendo
curl -I http://jobpath.anima.edu.uy/assets/index-BdrV74nU.css
```

#### 5. Verifica Fecha de Modificación del Build
```bash
stat /opt/Proyecto-Anima-2025/FrontEnd/dist/index.html
```

La fecha debería ser reciente (de cuando ejecutaste el script).

## 📊 Archivos CSS Modificados

Los siguientes archivos CSS fueron modificados en los commits recientes:

1. `Header.module.css` - Padding aumentado
2. `Login.module.css` - Dropdown personalizado + botón back
3. `DesafioDetalle.module.css` - Iconos reemplazados
4. `MisDesafios.module.css` - Background + line-clamp
5. `MisPostulaciones.module.css` - CSS completamente reconstruido (~110 líneas)
6. `OfertaDetalle.module.css` - Iconos + estados
7. `Recursos.module.css` - **Contraste mejorado + botones legibles**
8. `Mensajes.module.css` - Texto blanco en mensajes de usuario
9. `Red.module.css` - line-clamp estándar
10. `Landing.module.css` - Ajustes menores

## 🎨 Cambios Clave en Recursos.module.css

```css
/* ANTES */
.question-button {
  background: rgba(255, 255, 255, 0.2);
  color: white; /* ❌ Ilegible sobre fondo claro */
}

/* DESPUÉS */
.question-button {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea; /* ✅ Púrpura legible */
  font-weight: 500;
}
```

## 📞 Contacto

Si después de seguir todos estos pasos los estilos aún no se aplican:
1. Toma captura de pantalla de la consola del navegador (F12 → Console)
2. Toma captura de pantalla de Network mostrando el CSS cargado
3. Comparte los logs de Nginx

---

**Última actualización**: 22 de octubre de 2025
**Commit actual**: `df3342c` - Fix: Script ajustado
