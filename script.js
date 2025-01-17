// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDoF06G0K4C6DkiKBLdr7BECgOJW7vXmGA",
    authDomain: "planejamento-f5fe7.firebaseapp.com",
    projectId: "planejamento-f5fe7",
    storageBucket: "planejamento-f5fe7.firebasestorage.app",
    messagingSenderId: "207138969970",
    appId: "1:207138969970:web:410110bef88c58fb76a5eb",
    measurementId: "G-N4LLKSEBS2"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

let totalDepositado = 0;

// Função para recuperar dados salvos do Firebase
function carregarDados() {
    const depositosRef = database.ref('depositos');
    depositosRef.once('value', (snapshot) => {
        const dados = snapshot.val();
        if (dados) {
            totalDepositado = dados.total;
            atualizarTotal();

            // Marca os depósitos já feitos
            if (dados.numerosSelecionados) {
                dados.numerosSelecionados.forEach(num => {
                    const deposit = document.getElementById(`deposito-${num}`);
                    if (deposit) {
                        deposit.classList.add('clicked');
                    }
                });
            }
        }
    });
}

// Função para salvar os dados no Firebase
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

    const depositosRef = database.ref('depositos');
    depositosRef.set(dados); // Salva os dados no Firebase
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

// Função para resetar os depósitos
function resetarDepositos() {
    totalDepositado = 0;
    atualizarTotal();
    // Remover as classes "clicked" de todos os depósitos
    document.querySelectorAll('.deposit').forEach(deposit => {
        deposit.classList.remove('clicked');
    });
    salvarDados(); // Salva a alteração no Firebase
}

// Criar os depósitos e carregar os dados do Firebase
criarDepositos();
carregarDados();

// Adicionar evento para o botão de reset
document.getElementById('resetButton').addEventListener('click', resetarDepositos);
