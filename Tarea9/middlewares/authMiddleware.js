const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || authHeader !== 'Bearer mysecrettoken') {
        return res.status(403).json({ error: 'Acceso denegado. Token inválido o no proporcionado.' });
    }

    next(); // Continúa con la solicitud si el token es correcto
};

export default authMiddleware;
