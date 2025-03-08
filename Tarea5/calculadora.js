// Obtiene los argumentos de la línea de comandos
const args = process.argv.slice(2);

if (args.length < 3) {
    console.log("Uso: node calculadora.js <num1> <operación> <num2>");
    console.log("Ejemplo: node calculadora.js 5 + 3");
    process.exit(1);
}

// Extraer valores desde los argumentos
const num1 = parseFloat(args[0]);
const operador = args[1];
const num2 = parseFloat(args[2]);

// Verificar que los valores sean números válidos
if (isNaN(num1) || isNaN(num2)) {
    console.error("Error: Ambos valores deben ser números.");
    process.exit(1);
}

// Función para calcular el resultado
function calcular(num1, operador, num2) {
    switch (operador) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : "Error: División por cero";
        default:
            return "Error: Operación no válida. Usa +, -, *, /";
    }
}

// Calcular y mostrar el resultado
const resultado = calcular(num1, operador, num2);
console.log(`Resultado: ${resultado}`);
