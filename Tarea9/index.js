import express from 'express';
import fs from 'fs';
import authMiddleware from './middlewares/authMiddleware.js';
import validationMiddleware from './middlewares/validationMiddleware.js';

const app = express();
const PORT = 3002;

app.use(express.json());

const cargarEstudiantes = () => {
    try {
        const data = fs.readFileSync('estudiantes.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const guardarEstudiantes = (estudiantes) => {
    fs.writeFileSync('estudiantes.json', JSON.stringify(estudiantes, null, 2), 'utf8');
};

// GET /students - Obtener todos los estudiantes
app.get('/students', (req, res) => {
    const estudiantes = cargarEstudiantes();
    res.json(estudiantes);
});

// POST /students - Agregar un nuevo estudiante
app.post('/students', authMiddleware, validationMiddleware, (req, res) => {
    const estudiantes = cargarEstudiantes();
    const nuevoEstudiante = { id: estudiantes.length + 1, ...req.body };
    
    estudiantes.push(nuevoEstudiante);
    guardarEstudiantes(estudiantes);

    res.status(201).json({ mensaje: 'Estudiante agregado', estudiante: nuevoEstudiante });
});

// PUT /students/:id - Actualizar un estudiante
app.put('/students/:id', authMiddleware, validationMiddleware, (req, res) => {
    const estudiantes = cargarEstudiantes();
    const estudianteIndex = estudiantes.findIndex(est => est.id === parseInt(req.params.id));

    if (estudianteIndex === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    estudiantes[estudianteIndex] = { ...estudiantes[estudianteIndex], ...req.body };
    guardarEstudiantes(estudiantes);

    res.json({ mensaje: 'Estudiante actualizado', estudiante: estudiantes[estudianteIndex] });
});

// DELETE /students/:id - Eliminar un estudiante
app.delete('/students/:id', authMiddleware, (req, res) => {
    let estudiantes = cargarEstudiantes();
    const estudianteIndex = estudiantes.findIndex(est => est.id === parseInt(req.params.id));

    if (estudianteIndex === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    estudiantes = estudiantes.filter(est => est.id !== parseInt(req.params.id));
    guardarEstudiantes(estudiantes);

    res.json({ mensaje: 'Estudiante eliminado' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
