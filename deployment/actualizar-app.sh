#!/bin/bash

# Script de actualización automática de JobPath en VM
# Ejecutar con: bash actualizar-app.sh

set -e

echo "======================================"
echo "   JobPath - Actualización Automática"
echo "======================================"
echo ""

# Directorio de la aplicación
# Preferir la instalación en /opt/Proyecto-Anima-2025 si existe (ruta de producción)
PREFERRED_DIR="/opt/Proyecto-Anima-2025"
if [ -d "$PREFERRED_DIR" ]; then
    APP_DIR="$PREFERRED_DIR"
else
    APP_DIR="$HOME/jobpath"
fi

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
    # Clonar en la ruta preferida si está disponible, sino en $HOME/jobpath
    if [ -d "$PREFERRED_DIR" ] || [ "$(dirname \"$PREFERRED_DIR\")" = "/opt" ]; then
        # Asegurar que /opt existe y se pueda escribir (necesita sudo si no)
        if [ ! -d "$PREFERRED_DIR" ]; then
            sudo mkdir -p "$PREFERRED_DIR"
            sudo chown "$USER":"$USER" "$PREFERRED_DIR"
        fi
        git clone https://github.com/CherrySym/Proyecto-Anima-2025.git "$PREFERRED_DIR"
        cd "$PREFERRED_DIR"
    else
        cd "$HOME"
        git clone https://github.com/CherrySym/Proyecto-Anima-2025.git jobpath
        cd jobpath
    fi
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
        # Limpiar caché y build anterior
        log_info "Limpiando caché y build anterior..."
        rm -rf dist node_modules/.vite
        
        log_info "Instalando dependencias del Frontend..."
        npm ci --silent || npm install --silent
        
        log_info "Construyendo aplicación React (build limpio)..."
        npm run build --silent
        
        log_success "Frontend construido exitosamente"
        log_info "Nginx sirve directamente desde: FrontEnd/dist/"
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
    log_info "Reiniciando backend con pm2 (nombre: JobPath-Backend)..."
    if pm2 describe JobPath-Backend >/dev/null 2>&1; then
        pm2 reload JobPath-Backend || pm2 restart JobPath-Backend
        log_success "Backend reiniciado exitosamente"
    else
        log_info "Backend no encontrado en pm2, iniciando..."
        pm2 start npm --name JobPath-Backend -- run start
        log_success "Backend iniciado exitosamente"
    fi
    pm2 save
    cd ..
else
    log_warning "Carpeta BackEnd no encontrada"
fi
echo ""

# Reiniciar nginx para servir la nueva build
log_info "Paso 4: Actualizando Nginx..."
echo "--------------------------------------"
log_info "Limpiando caché de Nginx..."
# Limpiar caché de proxy si existe
if [ -d "/var/cache/nginx" ]; then
    sudo rm -rf /var/cache/nginx/*
fi

log_info "Verificando sintaxis de configuración de Nginx..."
if sudo nginx -t >/dev/null 2>&1; then
    log_success "Configuración de Nginx OK"
else
    log_error "⚠️  Error en configuración de Nginx"
    sudo nginx -t
    exit 1
fi

log_info "Reiniciando servicio de Nginx..."
sudo systemctl restart nginx

log_info "Verificando estado de Nginx..."
if sudo systemctl is-active --quiet nginx; then
    log_success "Nginx está corriendo correctamente"
else
    log_error "⚠️  Error: Nginx no está corriendo"
    sudo systemctl status nginx
    exit 1
fi
echo ""

echo "======================================"
log_success "¡Actualización completada con éxito!"
echo "======================================"
echo ""
log_info "� Ubicación del build: $APP_DIR/FrontEnd/dist/"
log_info "💡 IMPORTANTE: Limpia el caché del navegador"
log_info "   • Modo incógnito (Ctrl+Shift+N)"
log_info "   • O recarga forzada (Ctrl+Shift+R / Cmd+Shift+R)"
echo ""
