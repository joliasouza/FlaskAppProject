let produtos = []; // Array para armazenar os produtos

function mostrarFormulario() {
    // Exibe o overlay e o formulário
    document.getElementById('overlay').style.display = 'flex'; 
    document.getElementById('produto-form').style.display = 'block';
    
    // Esconde o botão "Adicionar Tarefa"
    document.getElementById('adicionar-btn').style.display = 'none';
    
    // Esconde o campo de status ao adicionar nova tarefa
    document.getElementById('produto-status').classList.add('hidden');
}


function adicionarOuAtualizarProduto() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const status = document.getElementById('status').value; // Corrigido para pegar o valor do select

    if (nome === '' || descricao === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (id) {
        // Atualiza produto existente
        const index = produtos.findIndex(produto => produto.id === parseInt(id));
        if (index !== -1) {
            produtos[index].nome = nome;
            produtos[index].descricao = descricao;
            produtos[index].status = status; // Corrigido para atualizar o status
        }
    } else {
        // Adiciona novo produto
        const novoProduto = {
            id: produtos.length + 1,
            nome: nome,
            descricao: descricao,
            status: status, // Armazena o status da tarefa
        };
        produtos.push(novoProduto);
    }

    // Limpa os campos e atualiza a tabela
    limparCampos();
    atualizarTabela();
    cancelarEdicao(); // Oculta o formulário após adicionar ou atualizar
}

function atualizarTabela() {
    const columns = document.querySelectorAll('.column');

    // Limpa apenas as tarefas, preservando os títulos
    columns.forEach(column => {
        // Preserva o título da coluna
        const title = column.querySelector('h3').innerHTML;
        column.innerHTML = `<h3>${title}</h3>`; // Reinsere o título
    });

    // Distribui as tarefas entre as colunas de acordo com o status
    produtos.forEach((produto) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
        `;
        div.style.border = '1px solid #ddd';
        div.style.padding = '10px';
        div.style.marginBottom = '10px';

        // Adiciona o evento de clique para editar a tarefa
        div.onclick = function() {
            editarProduto(produto.id); // Chama a função de edição passando o ID do produto
        };

        // Verifica o status e adiciona na coluna correspondente
        if (produto.status === "tarefas do dia") {
            // Coluna 1: "Tarefas do dia"
            columns[0].appendChild(div);
        } else if (produto.status === "fazendo") {
            // Coluna 2: "Fazendo"
            columns[1].appendChild(div);
        } else if (produto.status === "concluida") {
            // Coluna 3: "Concluídas"
            columns[2].appendChild(div);
        }
    });
}

function editarProduto(id) {
    const produto = produtos.find(produto => produto.id === id);
    if (produto) {
        document.getElementById('id').value = produto.id;
        document.getElementById('nome').value = produto.nome;
        document.getElementById('descricao').value = produto.descricao;
        document.getElementById('status').value = produto.status; // Atualiza o select de status

        document.getElementById('produto-form').style.display = 'block';
        document.getElementById('overlay').style.display = 'flex'; // Exibe o overlay
        document.getElementById('adicionar-btn').style.display = 'none';
        document.getElementById('cancelar-btn').style.display = 'inline';
        document.getElementById('remover-btn').style.display = 'inline'; // Exibe o botão de remover
        document.getElementById('produto-status').classList.remove('hidden');
    }
}

function removerProduto() {
    const id = document.getElementById('id').value;
    produtos = produtos.filter(produto => produto.id !== parseInt(id));
    atualizarTabela();
    cancelarEdicao();
}

function cancelarEdicao() {
    limparCampos();
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('produto-form').style.display = 'none';
    document.getElementById('adicionar-btn').style.display = 'inline';
    document.getElementById('cancelar-btn').style.display = 'none';
    document.getElementById('remover-btn').style.display = 'none';
    document.getElementById('produto-status').classList.add('hidden');
}

function limparCampos() {
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('status').value = 'tarefas do dia'; // Reseta o status para o padrão
}
