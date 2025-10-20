#!/bin/bash
# Script para encontrar archivos CSS duplicados (respaldos)
# Uso: ./scripts/find-duplicate-css.sh

echo "🗂️  Buscando archivos .css que podrían ser respaldos..."
echo "================================================"
echo ""

# Buscar archivos .css que NO son .module.css ni globales
FILES=$(find FrontEnd/src -name "*.css" \
  -not -name "*.module.css" \
  -not -name "index.css" \
  -not -name "App.css")

if [ -z "$FILES" ]; then
  echo "✅ No se encontraron archivos CSS duplicados"
else
  COUNT=$(echo "$FILES" | wc -l | tr -d ' ')
  echo "⚠️  Encontrados $COUNT archivos .css (posibles respaldos):"
  echo ""
  
  echo "$FILES" | while read -r file; do
    # Verificar si existe el correspondiente .module.css
    MODULE_FILE="${file%.css}.module.css"
    if [ -f "$MODULE_FILE" ]; then
      echo "🔄 $file"
      echo "   ↳ Tiene módulo: $MODULE_FILE"
    else
      echo "❓ $file"
      echo "   ↳ Sin módulo correspondiente"
    fi
    echo ""
  done
  
  echo "================================================"
  echo "💡 Sugerencia: Revisa si estos archivos están en uso"
  echo "   Si no, puedes eliminarlos con:"
  echo "   find FrontEnd/src -name \"*.css\" -not -name \"*.module.css\" -not -name \"index.css\" -not -name \"App.css\" -delete"
fi

echo ""
echo "✅ Análisis completado"
