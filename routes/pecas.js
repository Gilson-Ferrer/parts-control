const express = require('express');
const router = express.Router();
const pecaController = require('../controllers/pecaController');


router.get('/', pecaController.listarPecas);
router.post('/adicionar', pecaController.adicionarPeca); 

module.exports = router;