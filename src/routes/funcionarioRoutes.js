import express from 'express';
import{
    listarFuncionarios,
    inserirFuncionario
} from '../controllers/funcionarioController.js'

const router = express.Router();

// Rota para pegar informações
router.get('/', listarFuncionarios);
router.post('/',inserirFuncionario);

export default router;


