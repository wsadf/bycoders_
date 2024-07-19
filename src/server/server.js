import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());

const filePath = path.join('dados.json');

app.use(bodyParser.json());

app.get('/registration', (req, res) => {
    res.json({ message: 'API funcionando corretamente' });
});

app.post('/registration', (req, res) => {
    const novoCliente = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        let clientes = [];

        if (err) {
            if (err.code === 'ENOENT') {
                clientes = [];
            } else {
                return res.status(500).json({ error: 'Erro ao ler o arquivo' });
            }
        } else {
            clientes = JSON.parse(data);
        }

        clientes.push(novoCliente);

        fs.writeFile(filePath, JSON.stringify(clientes, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao escrever no arquivo' });
            }
            res.status(201).json({ message: 'Cliente adicionado com sucesso' });
        });
    });
});

app.listen(9000,() => console.log('server js'))