const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividade1',
    password: 'ds564',
    port: 5432
});

function calcularIdade(data_nascimento) {
    const dataAtual = new Date();
    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    const dataNascimento = new Date(data_nascimento);
    const mes = dataAtual.getMonth() - dataNascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && dataAtual.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    
    return idade;
}

function calcularSigno(dia, mes) {
    if ((dia >= 21 && mes == 3) || (dia <= 20 && mes == 4)) {
        return 'Áries';
    } else if ((dia >= 21 && mes == 4) || (dia <= 20 && mes == 5)) {
        return 'Touro';
    } else if ((dia >= 21 && mes == 5) || (dia <= 20 && mes == 6)) {
        return 'Gêmeos';
    } else if ((dia >= 21 && mes == 6) || (dia <= 22 && mes == 7)) {
        return 'Câncer';
    } else if ((dia >= 23 && mes == 7) || (dia <= 22 && mes == 8)) {
        return 'Leão';
    } else if ((dia >= 23 && mes == 8) || (dia <= 22 && mes == 9)) {
        return 'Virgem';
    } else if ((dia >= 23 && mes == 9) || (dia <= 22 && mes == 10)) {
        return 'Libra';
    } else if ((dia >= 23 && mes == 10) || (dia <= 21 && mes == 11)) {
        return 'Escorpião';
    } else if ((dia >= 22 && mes == 11) || (dia <= 21 && mes == 12)) {
        return 'Sagitário';
    } else if ((dia >= 22 && mes == 12) || (dia <= 20 && mes == 1)) {
        return 'Capricórnio';
    } else if ((dia >= 21 && mes == 1) || (dia <= 18 && mes == 2)) {
        return 'Aquário';
    } else if ((dia >= 19 && mes == 2) || (dia <= 20 && mes == 3)) {
        return 'Peixes';
    } else { return 'Data inválida'; }
}

app.post('/usuario', async (req, res) => {
    try {
    const { nome, sobrenome , data_nascimento, email } = req.body;

    const datanascimento = new Date(data_nascimento);
    const idade = calcularIdade(datanascimento);
    const signo = calcularSigno(datanascimento.getDate(), datanascimento.getMonth() + 1);

        await pool.query('INSERT INTO usuario (nome, sobrenome, data_nascimento, idade, signo, email) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, data_nascimento, idade, signo, email]);
        res.status(201).send({ mensagem: 'Usuário criado com sucesso'});
    } catch (error) {
        console.error("Erro ao criar usuário", error);
        res.status(500).send("Erro ao criar usuário");
    }
});

app.get('/usuario', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuario');
        res.json({
            usuarios: resultado.rows
        });
    } catch (error) {
        console.error("Erro ao buscar usuários", error);
        res.status(500).send("Erro ao buscar usuários");
    }
});

app.put('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, data_nascimento, email } = req.body;
        const datanascimento = new Date(data_nascimento);
        const idade = calcularIdade(datanascimento);
        const signo = calcularSigno(datanascimento.getDate(), datanascimento.getMonth() + 1);
        await pool.query('UPDATE usuario SET nome = $1, sobrenome = $2, data_nascimento = $3, idade = $4, signo = $5, email = $6 WHERE id = $7', [nome, sobrenome, data_nascimento, idade, signo, email, id]);
        res.send('Usuário atualizado com sucesso');
    } catch (error) {
        console.error("Erro ao atualizar usuário", error);
        res.status(500).send("Erro ao atualizar usuário");
    }
});
    
app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
        res.status(200).send('Usuário deletado com sucesso');
    } catch (error) {
        console.error("Erro ao deletar usuário", error);
        res.status(500).send("Erro ao deletar usuário");
    }
});

app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        res.json({
            usuario: resultado.rows
        });
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
        res.status(500).send("Erro ao buscar usuário");
    }
});


app.get('/', (req, res) => {
    res.send('Servidor funfando!');
});

// Rota de teste
app.listen(PORT, () => {
    console.log(`Servidor funfando ${PORT}`);
});