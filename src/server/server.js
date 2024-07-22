import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/registration', (req, res) => {
    try {
        res.status(200).json({ message: 'Bem-vindo à rota de registro.' });
    } catch (e) {
        res.status(500).json({ message: 'Erro interno do servidor.', error: e.message });
    }
});

app.post('/registration', (req, res) => {
    try {
        return res.status(201).json({ message: 'Usuário Cadastrado.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erro interno do servidor.', error: e.message });
    }
});

app.listen(9000, () => console.log('Server is running on port 9000'));
