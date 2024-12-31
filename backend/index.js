const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg'); // Importa o cliente PostgreSQL
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar o cliente PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Configurar o multer para armazenar arquivos na pasta "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Endpoint para upload de fotos
app.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    // Gera um caminho dinâmico baseado na requisição
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const fileName = req.file.filename;

    try {
        // Salva os dados da imagem no banco de dados
        await pool.query(
            'INSERT INTO uploads (filename, filepath) VALUES ($1, $2)',
            [fileName, filePath]
        );
        res.status(200).json({ filePath });
    } catch (err) {
        console.error('Erro ao salvar no banco:', err);
        res.status(500).json({ error: 'Erro ao salvar no banco de dados.' });
    }
});

// Endpoint para listar imagens
app.get('/images', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM uploads ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar imagens:', err);
        res.status(500).json({ error: 'Erro ao buscar imagens no banco de dados.' });
    }
});

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
