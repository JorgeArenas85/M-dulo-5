import http from 'http';
import fs from 'fs';

//  Función para leer productos desde productos.json
const cargarProductos = () => {
    try {
        const data = fs.readFileSync('productos.json', 'utf8');
        console.log(" Archivo leído correctamente:", data); // Depuración
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer productos:', err);
        return [];
    }
};

//  Función para guardar productos en productos.json
const guardarProductos = (productos) => {
    try {
        fs.writeFileSync('productos.json', JSON.stringify(productos, null, 2), 'utf8');
        console.log("✅ Productos guardados correctamente.");
    } catch (err) {
        console.error("Error al guardar productos:", err);
    }
};

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/product') {
        const productos = cargarProductos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(productos));
    } 
    
    else if (req.method === 'POST' && req.url === '/products') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });

        req.on('end', () => {
            try {
                const nuevoProducto = JSON.parse(body);
                const productos = cargarProductos();

                // Asignar un nuevo ID
                nuevoProducto.id = productos.length ? productos[productos.length - 1].id + 1 : 1;

                productos.push(nuevoProducto);
                guardarProductos(productos);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Producto agregado', producto: nuevoProducto }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Formato JSON inválido' }));
            }
        });
    } 
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

// Definir puerto y levantar el servidor
const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
