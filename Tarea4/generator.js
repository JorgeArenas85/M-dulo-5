import fs from 'fs';

// Generar números del 1 al 1000
const numeros = Array.from({ length: 1000 }, (_, i) => i + 1).join('\n');

// Guardar en archivo `numeros.txt`
fs.writeFileSync('numeros.txt', numeros, 'utf8');

console.log("Archivo 'numeros.txt' generado correctamente.");
