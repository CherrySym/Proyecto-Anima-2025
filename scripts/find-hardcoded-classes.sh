#!/bin/bash
# Script para encontrar clases hardcodeadas en archivos JSX
# Uso: ./scripts/find-hardcoded-classes.sh

echo "🔍 Buscando clases hardcodeadas en JSX..."
echo "================================================"
echo ""

# Contar ocurrencias
TOTAL=$(grep -rn 'className="[^{]' FrontEnd/src --include="*.jsx" | grep -v "// " | wc -l | tr -d ' ')

echo "Total encontrado: $TOTAL instancias"
echo ""
echo "Detalles por archivo:"
echo "================================================"

# Mostrar detalles agrupados por archivo
grep -rn 'className="[^{]' FrontEnd/src --include="*.jsx" | \
  grep -v "// " | \
  sort | \
  awk -F: '{
    if ($1 != prev_file) {
      if (prev_file != "") print "";
      print "📄 " $1;
      prev_file = $1;
    }
    print "   Línea " $2 ": " substr($0, index($0,$3));
  }'

echo ""
echo "================================================"
echo "✅ Análisis completado"
