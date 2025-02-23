// Importar la función esperarSegundos desde async.js
import esperarSegundos from './async.js';

// Llamar a la función con diferentes valores para probar tiempos de espera
await esperarSegundos(2);
await esperarSegundos(5);
await esperarSegundos(3);
