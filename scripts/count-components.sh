#!/bin/bash
# Script para contar componentes por categoría
# Uso: ./scripts/count-components.sh

echo "📊 Estadísticas del Proyecto JobPath"
echo "================================================"
echo ""

# Contar archivos JSX
TOTAL_JSX=$(find FrontEnd/src -name "*.jsx" | wc -l | tr -d ' ')
PAGES=$(find FrontEnd/src/pages -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')
COMPONENTS=$(find FrontEnd/src/components -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')
COMMON=$(find FrontEnd/src/components/common -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')
FEATURES=$(find FrontEnd/src/components/features -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')
LAYOUT=$(find FrontEnd/src/components/layout -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')

# Contar archivos CSS
TOTAL_CSS=$(find FrontEnd/src -name "*.css" | wc -l | tr -d ' ')
MODULE_CSS=$(find FrontEnd/src -name "*.module.css" | wc -l | tr -d ' ')
REGULAR_CSS=$(find FrontEnd/src -name "*.css" -not -name "*.module.css" | wc -l | tr -d ' ')

# Contar servicios, contextos, hooks
SERVICES=$(find FrontEnd/src/services -name "*.js" 2>/dev/null | wc -l | tr -d ' ')
CONTEXTS=$(find FrontEnd/src/context -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')
HOOKS=$(find FrontEnd/src/hooks -name "*.js" 2>/dev/null | wc -l | tr -d ' ')

echo "🔹 Componentes JSX:"
echo "   Total:           $TOTAL_JSX archivos"
echo "   Páginas:         $PAGES archivos"
echo "   Componentes:     $COMPONENTS archivos"
echo "     ├─ Common:     $COMMON"
echo "     ├─ Features:   $FEATURES"
echo "     └─ Layout:     $LAYOUT"
echo ""

echo "🎨 Archivos CSS:"
echo "   Total:           $TOTAL_CSS archivos"
echo "   CSS Modules:     $MODULE_CSS archivos"
echo "   CSS Regular:     $REGULAR_CSS archivos"
echo ""

echo "⚙️  Otros:"
echo "   Services:        $SERVICES archivos"
echo "   Contexts:        $CONTEXTS archivos"
echo "   Hooks:           $HOOKS archivos"
echo ""

# Páginas más largas (por carpeta)
echo "📏 Carpetas de páginas (primeras 10):"
find FrontEnd/src/pages -maxdepth 1 -type d | tail -n +2 | sort | head -10 | while read -r dir; do
  NAME=$(basename "$dir")
  echo "   - $NAME"
done

echo ""
echo "================================================"

# Calcular ratio CSS Modules vs CSS Regular
if [ $TOTAL_CSS -gt 0 ]; then
  MODULE_PERCENT=$((MODULE_CSS * 100 / TOTAL_CSS))
  echo "📈 Progreso CSS Modules: $MODULE_PERCENT%"
fi

echo ""
echo "✅ Análisis completado"
