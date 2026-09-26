const express = require('express');
const sequelize = require('./db/database');
const { Etapa, Peca } = require('./models/Peca'); // Importa os modelos

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/pecas'));

sequelize.sync({ force: false }).then(() => {
    console.log('Tabelas sincronizadas no SQLite com sucesso.');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
});