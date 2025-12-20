// @import "tailwindcss";
// @custom-variant dark (&:where(.dark, .dark *));
//Criando uma constante para chamar a rota
const API_URL = 'http://localhost:3000/funcionarios';

//função assincrona, pois estamos utilizando um banco de dados
async function carregarfuncionarios(){
    const response =await fetch(API_URL);
    const funcionarios = await response.json();

    const tabela = document.getElementById('tabela-funcionarios');
    tabela.innerHTML = '';

    // const salario = parseFloat(document.getElementById('salario').value)
    // <td>${salario.toFixed(2)}</td>

    funcionarios.forEach(func =>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="lineTableid" >${func.id}</td>
        <td class="lineTable">${func.nome}</td>
        <td class="lineTable">${func.cargo}</td>
        <td class="lineTable">${parseFloat(func.salario).toFixed(2)}</td>
        <td>
        <button class="buttonEditar" onclick="editarFuncionario(${func.id}, '${func.nome}','${func.cargo}',${func.salario})"> Editar </button>

        <br>

        <button class="buttonExcluir" onclick="excluirFuncionario(${func.id})"> Excluir </button>
        
        </td>
        
        `;
        tabela.appendChild(tr);

    } );

} 

document.getElementById('funcionarioForm').addEventListener('submit', async (e)=>{
    e.preventDefault();

    //Buscando do html = getElementById
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeFuncionario').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    const funciario = {
        nome,
        cargo,
        salario
    }

    if(id){
        await fetch(`${API_URL}/${id}`, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(funciario)
        });

    }else{
        //Se não passar o id, significa que vc está fazendo a inclusão
        await fetch(API_URL,{
             method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(funciario)

        });
    }

    e.target.reset();
    document.getElementById('id').value = '';
    carregarfuncionarios();

});

function editarFuncionario(id, nome, cargo, salario){
    document.getElementById('id').value = id;
    document.getElementById('nomeFuncionario').value = nome;
    document.getElementById('cargo').value = cargo;
    document.getElementById('salario').value = salario;

}

async function excluirFuncionario(id) {

    nome =document.getElementById('nomeFuncionario').value;
    if (confirm(`VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR O FUNCIONÁRIO?`)){
        await fetch(`${API_URL}/${id}`,{method:'DELETE'});
        carregarfuncionarios();
    }
    
}

carregarfuncionarios();