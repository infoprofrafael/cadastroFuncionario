import db from '../config/db.js'

export const listarFuncionarios = (req, res)=>{
    db.query('SELECT * FROM funcionarios', (err, results)=>{

        if(err) return res.status(500).json({erro: 'ERRO ao buscar Funcionários'});
        res.json(results);
    
    });

};

export const inserirFuncionario = (req, res)=>{

    const{nome, cargo, salario} = req.body;

    const sql = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?,?,?)';
    db.query(sql,[nome, cargo, salario], err =>{
        if(err) return res.status(500).json({erro: 'ERRO a inserir Funcionário'});
        res.json({mensagem:`Funcionário(a) ${nome} inserido(a) com sucesso!`});

    });
};

export const atualizarFuncionario = (req, res) =>{
    const {id} = req.params;
    const {nome, cargo, salario} = req.body;
    const sql = "UPDATE funcionarios SET nome=?, cargo=?, salario=? WHERE id=?";
    
    db.query(sql,[nome, cargo, salario, id], err =>{
        if (err) return res.status(500).json({err:'ERRO ao atualizar funcionário'});
        res.json({mensagem: `Funcionário(a) ${nome} atualizado(a) com sucesso!`});

    });
};

export const excluirFuncionario = (req, res) =>{
    const{id} = req.params;
    // Inserindo uma variávél para retornanr o nome do funcionário que foi demitido
     
    db.query('SELECT nome FROM funcionarios WHERE id=?', [id],(err, results)=>{
        if (err){
            return res.status(500).json({err:"Erro ao buscar o funcionário"});
        }
        if (results.length===0){
            return res.status(404).json({err:"Funcionário não encontrado!"});
        }

        const exfuncionario = results[0].nome;

        db.query('DELETE FROM funcionarios WHERE id=?', [id], err=>{
            if (err) return res.status(500).json({err:'ERRO ao excluir o funcionário'});
            res.json({mensagem: `O funcionário ${exfuncionario} foi excluído do quadro de funcionários com sucesso!`});
        });
    });

};



