import { useState, useCallback } from 'react';

/**
 * Hook personalizado para gestionar el estado de carga con un tiempo mínimo
 * Asegura que el spinner se muestre al menos el tiempo especificado
 * 
 * @param {number} minTime - Tiempo mínimo en milisegundos (default: 800ms)
 * @returns {Object} - { loading, withMinLoadingTime }
 */
export const useMinLoadingTime = (minTime = 800) => {
  const [loading, setLoading] = useState(false);

  /**
   * Envuelve una función asíncrona asegurando un tiempo mínimo de carga
   * @param {Function} asyncFunction - Función asíncrona a ejecutar
   * @returns {Promise} - Promesa que se resuelve después del tiempo mínimo
   */
  const withMinLoadingTime = useCallback(async (asyncFunction) => {
    setLoading(true);
    const startTime = Date.now();
    
    try {
      const result = await asyncFunction();
      
      // Calcular tiempo restante para alcanzar minTime
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minTime - elapsedTime);
      
      // Esperar el tiempo restante si es necesario
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  }, [minTime]);

  return { loading, withMinLoadingTime };
};

export default useMinLoadingTime;
