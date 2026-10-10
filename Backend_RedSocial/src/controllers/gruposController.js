const db = require('../config/db');

exports.listarGrupos = async (req, res) => {
    try {
        // DQL: Contando miembros por grupo (Agregación)
        const [rows] = await db.query(`
            SELECT g.*, COUNT(m.usuario_id) AS total_miembros 
            FROM grupos g 
            LEFT JOIN miembros_grupos m ON g.id = m.grupo_id 
            GROUP BY g.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unirseAGrupo = async (req, res) => {
    const { grupo_id, usuario_id } = req.body;
    try {
        await db.query('INSERT INTO miembros_grupos (grupo_id, usuario_id) VALUES (?, ?)', [grupo_id, usuario_id]);
        res.status(201).json({ msg: "Te has unido al grupo exitosamente" });
    } catch (err) {
        // En caso de que el usuario ya pertenezca al grupo (Primary Key o Unique)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ msg: "Ya eres miembro de este grupo" });
        }
        res.status(500).json({ error: err.message });
    }
};