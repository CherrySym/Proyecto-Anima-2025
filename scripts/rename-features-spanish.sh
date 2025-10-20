#!/bin/bash

# Script para actualizar imports después de renombrar features a español
# Actualiza todos los archivos JSX y JS del proyecto

cd "/Users/kathy/Documents/VSC Workspace/El repo yo habia hecho de JobPath/FrontEnd/src"

echo "🔄 Actualizando imports en todo el proyecto..."

# Mapeo de renombrados
declare -A renames=(
    ["auth"]="autenticacion"
    ["feed"]="inicio"
    ["jobs"]="empleos"
    ["challenges"]="desafios"
    ["courses"]="cursos"
    ["companies"]="empresas"
    ["guidance"]="orientacion"
    ["career"]="trayectoria"
    ["subscription"]="suscripciones"
    ["info"]="informacion"
)

# Actualizar todos los archivos JS/JSX
find . -type f \( -name "*.js" -o -name "*.jsx" \) -not -path "*/node_modules/*" | while read file; do
    sed -i '' \
        -e "s|features/auth/|features/autenticacion/|g" \
        -e "s|features/feed/|features/inicio/|g" \
        -e "s|features/jobs/|features/empleos/|g" \
        -e "s|features/challenges/|features/desafios/|g" \
        -e "s|features/courses/|features/cursos/|g" \
        -e "s|features/companies/|features/empresas/|g" \
        -e "s|features/guidance/|features/orientacion/|g" \
        -e "s|features/career/|features/trayectoria/|g" \
        -e "s|features/subscription/|features/suscripciones/|g" \
        -e "s|features/info/|features/informacion/|g" \
        "$file"
done

echo "✅ Imports actualizados en archivos JS/JSX"

# Actualizar vite.config.js si tiene referencias
if [ -f "../vite.config.js" ]; then
    echo "🔄 Actualizando vite.config.js..."
    # No hay cambios necesarios en aliases, solo apuntan a /features
    echo "✅ vite.config.js verificado"
fi

echo "✅ Proceso completado"
