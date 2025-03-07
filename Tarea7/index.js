// Importar express y fs
import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3002;

// Middleware para parsear JSON
app.use(express.json());

// Función para cargar los estudiantes desde el archivo JSON
const cargarEstudiantes = () => {
    try {
        const data = fs.readFileSync('students.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer estudiantes:', err);
        return [];
    }
};

// Función para guardar los estudiantes en el archivo JSON
const guardarEstudiantes = (students) => {
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2), 'utf8');
};

// Endpoint para obtener todos los estudiantes
app.get('/students', (req, res) => {
    const students = cargarEstudiantes();
    res.json(students);
});

// Endpoint para obtener un estudiante por ID
app.get('/students/:id', (req, res) => {
    const students = cargarEstudiantes();
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado' });
    }
});

// Endpoint para eliminar un estudiante por ID
app.delete('/students/:id', (req, res) => {
    let students = cargarEstudiantes();
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        guardarEstudiantes(students);
        res.json({ mensaje: 'Estudiante eliminado' });
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});