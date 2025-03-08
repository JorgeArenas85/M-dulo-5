// Función asíncrona que espera un número determinado de segundos
async function esperarSegundos(segundos) {
    console.log(`Esperando ${segundos} segundos...`);
    await new Promise(resolve => setTimeout(resolve, segundos * 1000));
    console.log(`Han pasado ${segundos} segundos. ¡Proceso completado!`);
}
esperarSegundos(3);
