let totalDepositado = 0;

// Função para recuperar dados salvos no localStorage
function carregarDados() {
    const dados = JSON.parse(localStorage.getItem('depositos'));
    if (dados) {
        totalDepositado = dados.total;
        atualizarTotal();

        // Marca os depósitos já feitos
        dados.numerosSelecionados.forEach(num => {
            const deposit = document.getElementById(`deposito-${num}`);
            if (deposit) {
                deposit.classList.add('clicked');
            }
        });
    }
}

// Função para salvar os dados no localStorage
function salvarDados() {
    const numerosSelecionados = [];
    document.querySelectorAll('.deposit.clicked').forEach(deposit => {
        const numero = parseInt(deposit.textContent, 10);
        numerosSelecionados.push(numero);
    });

    const dados = {
        total: totalDepositado,
        numerosSelecionados: numerosSelecionados
    };

    localStorage.setItem('depositos', JSON.stringify(dados));
}

// Função para criar os depósitos na tela
function criarDepositos() {
    const container = document.querySelector('.deposits-container');
    
    for (let i = 1; i <= 100; i++) {
        const deposit = document.createElement('div');
        deposit.classList.add('deposit');
        deposit.textContent = i;
        deposit.id = `deposito-${i}`;  // Atribui um id único ao número
        
        deposit.addEventListener('click', () => {
            if (deposit.classList.contains('clicked')) {
                // Se já estiver selecionado, desmarca
                deposit.classList.remove('clicked');
                totalDepositado -= i;
            } else {
                // Se não estiver selecionado, marca
                deposit.classList.add('clicked');
                totalDepositado += i;
            }
            atualizarTotal();
            salvarDados(); // Salva os dados sempre que um número é clicado
        });
        
        container.appendChild(deposit);
    }
}

// Função para atualizar o valor total
function atualizarTotal() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = totalDepositado.toFixed(2);
}

// Iniciar a criação dos depósitos e carregar dados salvos
criarDepositos();
carregarDados();
