let libros = [
    { titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', paginas: 300 },
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', paginas: 400 },
    { titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', paginas: 350 }
];

//Primer punto
let segundoLibro = libros[1];
console.log(`libros: ${segundoLibro.titulo}, autor: ${segundoLibro.autor}`);

//Segundo punto
libros [0].paginas=350
console.log (libros[0]);

//Tercer punto
let librosFiltrados = libros.map (libro => {
return {titulo: libro.titulo, autor:libro.autor}
})
console.log(librosFiltrados);

//**Punto 2: Cálculo de Estadísticas Básicas:** Dado el siguiente array de estudaintes y utilizando un bucle for:
  //  ```javascript
      const estudiantes = [
          { nombre: "Pedro", edad: 29, promedio: 7.9 },
          { nombre: "Ana", edad: 33, promedio: 8.9 },
          { nombre: "Pablo", edad: 32, promedio: 9.5 },
          { nombre: "Juan", edad: 25, promedio: 6.0 },
          { nombre: "Maria", edad: 28, promedio: 7.3 },
          { nombre: "Andres", edad: 45, promedio: 8.7 },
     ];
     //Sumar edades
     let sumarEdades = 0;
     for(let i =0; i < estudiantes.length;i++){
        sumarEdades += estudiantes[i].edad
     }
     console.log(`La suma de las edades es: ${sumarEdades}`)

     //calcula el promedio de edad
     let calcularEdad =0;
     for(let i=0; i <estudiantes.length;i++){
        calcularEdad += estudiantes[i].edad
     }
     let promedioDeEdad = calcularEdad / estudiantes.length;
     console.log(`El promedio de edad de los estudiantes es: ${promedioDeEdad}`)


//Punto 3: Búsqueda y Filtrado de Datos:** Dado el siguiente array de productos:
     
      let productos = [
          { nombre: 'Camisa', categoria: 'Ropa', precio: 20 },
          { nombre: 'Computadora', categoria: 'Electrónica', precio: 800 },
          { nombre: 'Zapatos', categoria: 'Ropa', precio: 50 },
          { nombre: 'Teléfono', categoria: 'Electrónica', precio: 300 }
      ];
     // Utilizando `filter` debes filtrar productos que tengan la categoría 'Ropa'
     let productoRopa = productos.filter(productos => productos.categoria === `Ropa`);
     console.log(productoRopa);

     let preciosMayores = productos.filter(productos => productos.precio > `30`)
     console.log(preciosMayores);