#!/bin/bash
# Script de despliegue para JobPath en VM
# Ejecutar con: bash deploy-vm.sh

set -e  # Salir si hay algún error

echo "🚀 JobPath - Script de Despliegue en VM"
echo "========================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración (AJUSTAR SEGÚN TU VM)
FRONTEND_DIR="/var/www/jobpath/frontend"
BACKEND_DIR="/var/www/jobpath/backend"
NGINX_CONFIG="/etc/nginx/sites-available/jobpath"
DB_NAME="JobPath_DB"

echo ""
echo "📋 Verificando prerrequisitos..."

# Verificar que estamos en el directorio correcto
if [ ! -f "BackEnd/package.json" ] || [ ! -f "FrontEnd/package.json" ]; then
    echo -e "${RED}❌ Error: Ejecuta este script desde la raíz del proyecto${NC}"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version)${NC}"

# Verificar MySQL
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠️  MySQL CLI no encontrado (podría estar instalado pero no en PATH)${NC}"
else
    echo -e "${GREEN}✅ MySQL disponible${NC}"
fi

# Verificar PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 no está instalado. Instalando...${NC}"
    sudo npm install -g pm2
    echo -e "${GREEN}✅ PM2 instalado${NC}"
else
    echo -e "${GREEN}✅ PM2 disponible${NC}"
fi

# Verificar nginx
if ! command -v nginx &> /dev/null; then
    echo -e "${RED}❌ Nginx no está instalado${NC}"
    echo "Instalar con: sudo apt update && sudo apt install nginx"
    exit 1
fi
echo -e "${GREEN}✅ Nginx $(nginx -v 2>&1 | cut -d'/' -f2)${NC}"

echo ""
echo "🏗️  PASO 1: Compilando Frontend..."
cd FrontEnd
echo "   Instalando dependencias..."
npm install
echo "   Compilando con Vite..."
npm run build
cd ..
echo -e "${GREEN}✅ Frontend compilado${NC}"

echo ""
echo "📦 PASO 2: Preparando Backend..."
cd BackEnd
echo "   Instalando dependencias de producción..."
npm install --production
echo "   Generando Prisma Client..."
npx prisma generate
cd ..
echo -e "${GREEN}✅ Backend preparado${NC}"

echo ""
echo "📂 PASO 3: Copiando archivos..."

# Crear directorios si no existen
sudo mkdir -p "$FRONTEND_DIR"
sudo mkdir -p "$BACKEND_DIR"

# Copiar frontend compilado
echo "   Copiando frontend a $FRONTEND_DIR..."
sudo cp -r FrontEnd/dist/* "$FRONTEND_DIR/"
sudo chown -R www-data:www-data "$FRONTEND_DIR"

# Copiar backend
echo "   Copiando backend a $BACKEND_DIR..."
sudo cp -r BackEnd/* "$BACKEND_DIR/"

# Copiar archivo .env si existe
if [ -f "BackEnd/.env" ]; then
    sudo cp BackEnd/.env "$BACKEND_DIR/.env"
    echo -e "${GREEN}   ✅ Archivo .env copiado${NC}"
else
    echo -e "${YELLOW}   ⚠️  No se encontró .env en BackEnd/. Crear manualmente en $BACKEND_DIR/.env${NC}"
fi

echo -e "${GREEN}✅ Archivos copiados${NC}"

echo ""
echo "🔧 PASO 4: Configurando Nginx..."

# Copiar configuración nginx
if [ -f "nginx-jobpath.conf" ]; then
    sudo cp nginx-jobpath.conf "$NGINX_CONFIG"
    
    # Crear enlace simbólico si no existe
    if [ ! -L "/etc/nginx/sites-enabled/jobpath" ]; then
        sudo ln -s "$NGINX_CONFIG" /etc/nginx/sites-enabled/jobpath
    fi
    
    # Probar configuración
    if sudo nginx -t; then
        echo -e "${GREEN}✅ Configuración nginx válida${NC}"
        sudo systemctl reload nginx
        echo -e "${GREEN}✅ Nginx recargado${NC}"
    else
        echo -e "${RED}❌ Error en configuración nginx${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Archivo nginx-jobpath.conf no encontrado${NC}"
fi

echo ""
echo "🚀 PASO 5: Iniciando Backend con PM2..."

cd "$BACKEND_DIR"

# Detener proceso anterior si existe
pm2 stop jobpath-backend 2>/dev/null || true
pm2 delete jobpath-backend 2>/dev/null || true

# Iniciar nuevo proceso
pm2 start src/server.js --name jobpath-backend --env production

# Guardar configuración PM2
pm2 save

# Configurar auto-inicio (solo la primera vez)
if ! pm2 list | grep -q "jobpath-backend"; then
    sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $(whoami) --hp $(eval echo ~$(whoami))
fi

echo -e "${GREEN}✅ Backend iniciado con PM2${NC}"

echo ""
echo "🧪 PASO 6: Verificando despliegue..."

# Verificar backend
sleep 2
if curl -f http://localhost:4000/ &> /dev/null; then
    echo -e "${GREEN}✅ Backend respondiendo en puerto 4000${NC}"
else
    echo -e "${RED}❌ Backend no responde${NC}"
    echo "Ver logs con: pm2 logs jobpath-backend"
fi

# Verificar nginx
if curl -f http://localhost/ &> /dev/null; then
    echo -e "${GREEN}✅ Nginx respondiendo${NC}"
else
    echo -e "${YELLOW}⚠️  Nginx podría no estar respondiendo correctamente${NC}"
fi

# Verificar proxy
if curl -f http://localhost/api/ &> /dev/null; then
    echo -e "${GREEN}✅ Proxy /api/ funcionando${NC}"
else
    echo -e "${YELLOW}⚠️  Proxy /api/ podría tener problemas${NC}"
fi

echo ""
echo "✅ DESPLIEGUE COMPLETADO"
echo "========================"
echo ""
echo "🌐 Acceder a: http://jobpath.anima.edu.uy"
echo ""
echo "📊 Comandos útiles:"
echo "   Ver logs backend:  pm2 logs jobpath-backend"
echo "   Reiniciar backend: pm2 restart jobpath-backend"
echo "   Ver status PM2:    pm2 status"
echo "   Logs nginx:        sudo tail -f /var/log/nginx/jobpath_error.log"
echo "   Reiniciar nginx:   sudo systemctl restart nginx"
echo ""
echo "⚠️  RECORDATORIO: Verificar que el archivo .env tenga las credenciales correctas:"
echo "   $BACKEND_DIR/.env"
echo ""
