#!/bin/bash

# Script para actualizar imports después de reorganización a features
# Ejecuta búsquedas y reemplazos masivos en archivos JSX

cd "/Users/kathy/Documents/VSC Workspace/El repo yo habia hecho de JobPath/FrontEnd/src"

echo "🔄 Actualizando imports en archivos de features..."

# Función para actualizar imports en un directorio específico
update_imports() {
    local feature=$1
    local depth=$2  # Profundidad de anidamiento (pages o components)
    
    echo "📁 Procesando feature: $feature/$depth"
    
    # Para archivos en features/FEATURE/pages/PAGENAME/
    if [ "$depth" = "pages" ]; then
        find "features/$feature/$depth" -name "*.jsx" -type f -exec sed -i '' \
            -e "s|from '../../context/|from '../../../../context/|g" \
            -e "s|from '../../hooks/|from '../../../../hooks/|g" \
            -e "s|from '../../data/|from '../../../../data/|g" \
            -e "s|from '../../components/layout/|from '../../../../components/layout/|g" \
            -e "s|from '../../components/common/|from '../../../../components/common/|g" \
            -e "s|from '../../components/features/CreatePost/|from '../../components/CreatePost/|g" \
            -e "s|from '../../components/features/Post/|from '../../components/Post/|g" \
            -e "s|from '../../services/postsService|from '../../services/postsService|g" \
            -e "s|from '../../services/postService|from '../../services/postService|g" \
            -e "s|from '../../services/ofertasService|from '../../services/ofertasService|g" \
            -e "s|from '../../services/postulacionesService|from '../../services/postulacionesService|g" \
            -e "s|from '../../services/desafiosService|from '../../services/desafiosService|g" \
            -e "s|from '../../services/cursosService|from '../../services/cursosService|g" \
            -e "s|from '../../services/empresasService|from '../../services/empresasService|g" \
            -e "s|from '../../services/comentariosService|from '../../services/comentariosService|g" \
            -e "s|from '../../services/likesService|from '../../services/likesService|g" \
            -e "s|from '../../services/usersService|from '../../../../services/usersService|g" \
            {} \;
    fi
    
    # Para archivos en features/FEATURE/components/COMPONENT/
    if [ "$depth" = "components" ]; then
        find "features/$feature/$depth" -name "*.jsx" -type f -exec sed -i '' \
            -e "s|from '../../context/|from '../../../../context/|g" \
            -e "s|from '../../hooks/|from '../../../../hooks/|g" \
            -e "s|from '../../../services/|from '../../services/|g" \
            {} \;
    fi
}

# Actualizar cada feature
for feature in auth feed jobs challenges courses companies guidance career subscription info; do
    update_imports "$feature" "pages"
    update_imports "$feature" "components"
done

echo "✅ Imports actualizados en archivos de features"

# Actualizar componentes que importaban desde features
echo "🔄 Actualizando componentes que importaban servicios..."

find components -name "*.jsx" -type f -exec sed -i '' \
    -e "s|from '../services/postsService|from '../features/feed/services/postsService|g" \
    -e "s|from '../../services/postsService|from '../../features/feed/services/postsService|g" \
    {} \;

echo "✅ Script completado"
