import express from 'express';
import{
    listarFuncionarios,
    inserirFuncionario,
    atualizarFuncionario,
    excluirFuncionario
} from '../controllers/funcionarioController.js'

const router = express.Router();

// Rota para pegar informações
router.get('/', listarFuncionarios);
router.post('/',inserirFuncionario);
router.put('/:id',atualizarFuncionario);
router.delete('/:id',excluirFuncionario);

export default router;


