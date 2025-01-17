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

// Referência ao contêiner de botões e à lista de depósitos
const buttonsContainer = document.getElementById("buttons-container");
const depositList = document.getElementById("deposit-list");
const totalSumElement = document.getElementById("total-sum");

// Variáveis para controlar a soma dos depósitos
let totalSum = 0;

// Função para salvar o depósito no Firebase
function saveDeposit(depositValue) {
    const depositRef = database.ref("deposits");
    depositRef.push(depositValue);

    // Atualiza a soma total
    totalSum += depositValue;
    totalSumElement.textContent = `R$${totalSum}`;

    // Exibe o novo depósito na lista
    const listItem = document.createElement("li");
    listItem.textContent = `Depósito: R$${depositValue}`;
    depositList.appendChild(listItem);
}

// Função para exibir os depósitos salvos
function displayDeposits() {
    const depositRef = database.ref("deposits");
    depositRef.on("value", function(snapshot) {
        const deposits = snapshot.val();
        depositList.innerHTML = "";
        totalSum = 0;  // Reseta a soma antes de recalcular

        for (let id in deposits) {
            const deposit = deposits[id];
            totalSum += deposit;

            // Exibe cada depósito
            const listItem = document.createElement("li");
            listItem.textContent = `Depósito: R$${deposit}`;
            depositList.appendChild(listItem);
        }

        // Atualiza a somatória dos depósitos
        totalSumElement.textContent = `R$${totalSum}`;
    });
}

// Função para criar os botões de 1 a 100
function createButtons() {
    console.log('Criando botões...'); // Log de depuração
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement("button");
        button.classList.add("deposit-button");
        button.textContent = i;
        button.dataset.value = i;

        // Evento de clique para salvar o depósito e mudar a cor do botão
        button.addEventListener("click", () => {
            button.classList.add("selected");  // Muda a cor do botão
            saveDeposit(i);
        });

        buttonsContainer.appendChild(button);
    }
}

// Esperar o carregamento total da página
document.addEventListener("DOMContentLoaded", function() {
    console.log('Página carregada com sucesso!'); // Log de depuração
    createButtons();
    displayDeposits();
});
