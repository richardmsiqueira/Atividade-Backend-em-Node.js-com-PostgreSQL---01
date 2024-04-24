CREATE DATABASE atividade1;
\c atividade1;

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    idade INT NOT NULL,
    signo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO usuario (nome, sobrenome, data_nascimento, idade, signo, email) VALUES ('João', 'Silva', '1990-01-01', 30, 'Capricórnio', 'joaosilva@gmail.com');
