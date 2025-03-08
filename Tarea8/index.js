import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3002;

app.use(express.json()); // Middleware para manejar JSON en los requests

// Función para leer estudiantes desde el archivo JSON
const leerEstudiantes = () => {
    try {
        const data = fs.readFileSync('estudiantes.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Función para guardar estudiantes en el archivo JSON
const guardarEstudiantes = (estudiantes) => {
    fs.writeFileSync('estudiantes.json', JSON.stringify(estudiantes, null, 2), 'utf8');
};

// GET: Obtener todos los estudiantes
app.get('/students', (req, res) => {
    const estudiantes = leerEstudiantes();
    res.json(estudiantes);
});

// GET: Obtener un estudiante por ID
app.get('/students/:id', (req, res) => {
    const estudiantes = leerEstudiantes();
    const estudiante = estudiantes.find(est => est.id === parseInt(req.params.id));

    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(estudiante);
});

// POST: Agregar un nuevo estudiante
app.post('/students', (req, res) => {
    let estudiantes = leerEstudiantes();
    const { name, age, major } = req.body;

    if (!name || !age || !major || age <= 0) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const nuevoEstudiante = {
        id: estudiantes.length ? estudiantes[estudiantes.length - 1].id + 1 : 1,
        name,
        age,
        major
    };

    estudiantes.push(nuevoEstudiante);
    guardarEstudiantes(estudiantes);

    res.status(201).json({ mensaje: 'Estudiante agregado', estudiante: nuevoEstudiante });
});

// PUT: Actualizar datos de un estudiante
app.put('/students/:id', (req, res) => {
    let estudiantes = leerEstudiantes();
    const id = parseInt(req.params.id);
    const { name, age, major } = req.body;

    const index = estudiantes.findIndex(est => est.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    if (name) estudiantes[index].name = name;
    if (age && age > 0) estudiantes[index].age = age;
    if (major) estudiantes[index].major = major;

    guardarEstudiantes(estudiantes);
    res.json({ mensaje: 'Estudiante actualizado', estudiante: estudiantes[index] });
});

// DELETE: Eliminar un estudiante por ID
app.delete('/students/:id', (req, res) => {
    let estudiantes = leerEstudiantes();
    const id = parseInt(req.params.id);

    const index = estudiantes.findIndex(est => est.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    estudiantes.splice(index, 1);
    guardarEstudiantes(estudiantes);

    res.json({ mensaje: 'Estudiante eliminado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
