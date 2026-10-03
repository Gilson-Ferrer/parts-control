const { Peca, Etapa } = require('../models/Peca');

exports.listarPecas = async (req, res) => {
    try {
        const pecas = await Peca.findAll({ include: Etapa }); 
        res.render('index', { pecas });
    } catch (erro) {
        res.status(500).send('Erro ao buscar dados: ' + erro.message);
    }
};

exports.adicionarPeca = async (req, res) => {
    try {
        const { nome, part_number, preco, status, etapa_nome } = req.body;

        const [etapa] = await Etapa.findOrCreate({
            where: { nome: etapa_nome }
        });

        await Peca.create({
            nome,
            part_number,
            preco,
            status,
            etapaId: etapa.id
        });

        res.redirect('/');
    } catch (erro) {
        res.status(500).send('Erro ao salvar peça: ' + erro.message);
    }
};

exports.deletarPeca = async (req, res) => {
    try {
        await Peca.destroy({ where: { id: req.params.id } });
        res.redirect('/');
    } catch (erro) {
        res.status(500).send('Erro ao deletar peça: ' + erro.message);
    }
};