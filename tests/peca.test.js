const request = require('supertest');
const express = require('express');
const sequelize = require('../db/database');
const pecasRouter = require('../routes/pecas');
const { Etapa, Peca } = require('../models/Peca');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', pecasRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true }); 
});


afterAll(async () => {
    await sequelize.close();
});

describe('Testes Unitários e de Integração - Parts Control', () => {
    
    test('1. Model: Deve criar uma Etapa e uma Peça no banco de dados', async () => {
        const etapa = await Etapa.create({ nome: 'Freios', descricao: 'Sistema de frenagem' });
        const peca = await Peca.create({
            nome: 'Pastilha de Freio',
            preco: 120.50,
            status: 'Comprada',
            etapaId: etapa.id
        });
        
        expect(etapa.id).toBeDefined();
        expect(peca.nome).toBe('Pastilha de Freio');
        expect(peca.etapaId).toBe(etapa.id);
    });

    test('2. View/Router: A rota principal (GET /) deve carregar a interface (Status 200)', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Parts Control - Gestão de Restauração');
    });

    test('3. Controller: A rota de adição (POST /adicionar) deve salvar e redirecionar (Status 302)', async () => {
        const response = await request(app)
            .post('/adicionar')
            .send({
                nome: 'Cilindro Mestre',
                part_number: 'CM-990',
                preco: '250.00',
                status: 'Pendente',
                etapa_nome: 'Freios'
            });
        
        expect(response.statusCode).toBe(302); 
        expect(response.headers.location).toBe('/');
    });
});