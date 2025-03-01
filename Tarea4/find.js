import fs from 'fs';

fs.readFile('numeros.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error al leer el archivo:", err);
        return;
    }
    const numeros = data.split('\n');

    let contadorPares = 0;

    for (let i = 0; i < numeros.length; i++) {
        const numero = parseInt(numeros[i]); // Convertir de string a número

        if (numero % 2 === 0) {
            // Es par
            contadorPares++;
        } else {
            // No es par
        }
    }
    console.log(`Cantidad de números pares en el archivo: ${contadorPares}`);
});


