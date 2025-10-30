// Script de migración para convertir estadísticas antiguas al nuevo formato
// Este script se puede ejecutar desde la consola del navegador si necesitas migrar datos existentes

export const migrateOldStats = (subjectId = 'programacion') => {
  const keys = Object.keys(localStorage);

  // Buscar claves antiguas (sin subjectId)
  const oldStatsKeys = keys.filter(key =>
    key.startsWith('card-stats-') &&
    !key.match(/card-stats-\w+-\d+/)
  );

  let migratedCount = 0;

  oldStatsKeys.forEach(oldKey => {
    // Obtener el cardId
    const cardId = oldKey.replace('card-stats-', '');

    // Crear la nueva clave con el subjectId
    const newKey = `card-stats-${subjectId}-${cardId}`;

    // Copiar los datos
    const data = localStorage.getItem(oldKey);
    localStorage.setItem(newKey, data);

    // Opcionalmente, eliminar la clave antigua
    // localStorage.removeItem(oldKey);

    migratedCount++;
  });

  console.log(`Migración completada: ${migratedCount} tarjetas migradas a ${subjectId}`);
  return migratedCount;
};

// Para usar este script, abre la consola del navegador y ejecuta:
// import { migrateOldStats } from './src/utils/migrationUtils.js'
// migrateOldStats('programacion')

// O si lo prefieres, puedes ejecutarlo directamente en la consola:
/*
const migrateOldStats = (subjectId = 'programacion') => {
  const keys = Object.keys(localStorage);
  const oldStatsKeys = keys.filter(key =>
    key.startsWith('card-stats-') &&
    !key.match(/card-stats-\w+-\d+/)
  );
  let migratedCount = 0;
  oldStatsKeys.forEach(oldKey => {
    const cardId = oldKey.replace('card-stats-', '');
    const newKey = `card-stats-${subjectId}-${cardId}`;
    const data = localStorage.getItem(oldKey);
    localStorage.setItem(newKey, data);
    migratedCount++;
  });
  console.log(`Migración completada: ${migratedCount} tarjetas migradas a ${subjectId}`);
  return migratedCount;
};
migrateOldStats('programacion');
*/
