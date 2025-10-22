#!/bin/bash

# Script de actualización automática de JobPath en VM
# Ejecutar con: bash actualizar-app.sh

echo "======================================"
echo "   JobPath - Actualización Automática"
echo "======================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directorio de la aplicación
APP_DIR="$HOME/jobpath"

# Función para mostrar mensajes
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Verificar si existe el directorio del proyecto
if [ ! -d "$APP_DIR" ]; then
    log_error "Directorio $APP_DIR no encontrado"
    log_info "Clonando repositorio..."
    cd "$HOME"
    git clone https://github.com/CherrySym/Proyecto-Anima-2025.git jobpath
    cd jobpath
else
    cd "$APP_DIR"
fi

echo ""
log_info "Paso 1: Actualizando código desde GitHub..."
echo "--------------------------------------"

# Guardar cambios locales si los hay
git stash save "Auto-stash antes de actualizar $(date)"

# Obtener última versión del repositorio
git fetch origin main

# Verificar si hay actualizaciones
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    log_warning "Ya estás en la última versión"
    NEEDS_UPDATE=false
else
    log_info "Hay actualizaciones disponibles"
    log_info "Versión actual: ${LOCAL:0:7}"
    log_info "Nueva versión: ${REMOTE:0:7}"
    NEEDS_UPDATE=true
    
    # Actualizar a la última versión
    git reset --hard origin/main
    log_success "Código actualizado exitosamente"
fi
#!/bin/bash

# Simple script para actualizar la app en la VM
# Uso: sudo bash actualizar-app.sh  (requiere permisos para reiniciar nginx y pm2)

set -e

APP_DIR="$HOME/jobpath"

log() { echo "[INFO] $1"; }
log_ok() { echo "[OK] $1"; }
log_warn() { echo "[WARN] $1"; }

# Asegurar que estemos en el directorio de la app
if [ ! -d "$APP_DIR" ]; then
    log "Directorio $APP_DIR no existe. Clonando repo..."
    git clone https://github.com/CherrySym/Proyecto-Anima-2025.git "$APP_DIR"
fi

cd "$APP_DIR"

# Guardar cambios locales (si los hay)
# Guardar working tree en stash para evitar conflictos
git stash push -m "autostash before update" || true

# Traer objetos remotos
# Obtiene referencias remotas sin usar git status
git fetch origin main

# Comparar commits locales y remotos
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    log_warn "Repositorio en VM ya coincide con origin/main — no se requiere actualización"
    exit 0
fi

# Extra: mostrar hashes y actualizar
log "Actualización detectada: $LOCAL -> $REMOTE"

# Traer y resetear a origin/main (despliegue limpio)
# Reemplaza el código local por la versión en origin/main
git reset --hard origin/main
log_ok "Código actualizado a origin/main"

# Frontend: instalar dependencias y build
# Ir al directorio FrontEnd y ejecutar build
if [ -d "FrontEnd" ]; then
    log "Instalando dependencias del Frontend (si es necesario)"
    cd FrontEnd
    if [ -f package.json ]; then
        npm ci --silent || npm install --silent
        log "Building Frontend..."
        npm run build --silent
        log_ok "Frontend construido"
    else
        log_warn "No se encontró package.json en FrontEnd"
    fi
    cd ..
else
    log_warn "Carpeta FrontEnd no encontrada"
fi

# Backend: instalar dependencias y reiniciar con pm2 (puerto 4000)
# Ir al directorio BackEnd
if [ -d "BackEnd" ]; then
    log "Instalando dependencias del Backend (si es necesario)"
    cd BackEnd
    if [ -f package.json ]; then
        npm ci --silent || npm install --silent
        log_ok "Dependencias del Backend listas"
    else
        log_warn "No se encontró package.json en BackEnd"
    fi

    # Reiniciar la app con pm2 — se asume que la app está registrada como 'jobpath-backend'
    # Si no está registrada, el siguiente comando la iniciará: pm2 start npm --name jobpath-backend -- run start
    log "Reiniciando backend con pm2 (nombre: jobpath-backend)"
    if pm2 describe jobpath-backend >/dev/null 2>&1; then
        pm2 reload jobpath-backend || pm2 restart jobpath-backend
    else
        pm2 start npm --name jobpath-backend -- run start
    fi
    pm2 save
    log_ok "Backend reiniciado por pm2"
    cd ..
else
    log_warn "Carpeta BackEnd no encontrada"
fi

# Reiniciar nginx para servir la nueva build
# Se usa systemctl para reiniciar nginx
log "Reiniciando nginx"
sudo systemctl restart nginx
log_ok "nginx reiniciado"

log_ok "Actualización completada con éxito"
