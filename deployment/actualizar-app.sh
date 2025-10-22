#!/bin/bash

# Script de actualización automática de JobPath en VM
# Ejecutar con: bash actualizar-app.sh

set -e

echo "======================================"
echo "   JobPath - Actualización Automática"
echo "======================================"
echo ""

# Directorio de la aplicación
APP_DIR="$HOME/jobpath"

# Funciones para mensajes con colores
log_info() {
    echo -e "\033[0;34m[INFO]\033[0m $1"
}

log_success() {
    echo -e "\033[0;32m[✓]\033[0m $1"
}

log_warning() {
    echo -e "\033[1;33m[!]\033[0m $1"
}

log_error() {
    echo -e "\033[0;31m[✗]\033[0m $1"
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
git stash push -m "autostash before update $(date)" || true

# Obtener última versión del repositorio
git fetch origin main

# Verificar si hay actualizaciones
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    log_warning "Ya estás en la última versión"
    log_info "No se requiere actualización del código"
    echo ""
else
    log_info "Hay actualizaciones disponibles"
    log_info "Versión actual: ${LOCAL:0:7}"
    log_info "Nueva versión: ${REMOTE:0:7}"
    
    # Actualizar a la última versión
    git reset --hard origin/main
    log_success "Código actualizado exitosamente"
    echo ""
fi

# Frontend: instalar dependencias y build
log_info "Paso 2: Construyendo Frontend..."
echo "--------------------------------------"
if [ -d "FrontEnd" ]; then
    cd FrontEnd
    if [ -f package.json ]; then
        log_info "Instalando dependencias del Frontend..."
        npm ci --silent || npm install --silent
        log_info "Construyendo aplicación React..."
        npm run build --silent
        log_success "Frontend construido exitosamente"
        cd ..
    else
        log_warning "No se encontró package.json en FrontEnd"
        cd ..
    fi
else
    log_warning "Carpeta FrontEnd no encontrada"
fi
echo ""

# Backend: instalar dependencias y reiniciar con pm2
log_info "Paso 3: Actualizando Backend..."
echo "--------------------------------------"
if [ -d "BackEnd" ]; then
    cd BackEnd
    if [ -f package.json ]; then
        log_info "Instalando dependencias del Backend..."
        npm ci --silent || npm install --silent
        log_success "Dependencias del Backend listas"
    else
        log_warning "No se encontró package.json en BackEnd"
    fi

    # Reiniciar la app con pm2
    log_info "Reiniciando backend con pm2 (nombre: jobpath-backend)..."
    if pm2 describe jobpath-backend >/dev/null 2>&1; then
        pm2 reload jobpath-backend || pm2 restart jobpath-backend
        log_success "Backend reiniciado exitosamente"
    else
        log_info "Backend no encontrado en pm2, iniciando..."
        pm2 start npm --name jobpath-backend -- run start
        log_success "Backend iniciado exitosamente"
    fi
    pm2 save
    cd ..
else
    log_warning "Carpeta BackEnd no encontrada"
fi
echo ""

# Reiniciar nginx para servir la nueva build
log_info "Paso 4: Reiniciando Nginx..."
echo "--------------------------------------"
sudo systemctl restart nginx
log_success "Nginx reiniciado exitosamente"
echo ""

echo "======================================"
log_success "¡Actualización completada con éxito!"
echo "======================================"
