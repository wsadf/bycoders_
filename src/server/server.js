import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.post('/registration', (req, res) => {
    try {
        return res.status(201).json({ message: 'Usuário Cadastrado.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erro interno do servidor.', error: e.message });
    }
});

app.listen(9000, () => console.log('server js'));
