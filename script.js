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

// Adicionar ou atualizar o depósito no Firebase
function saveDeposit(depositValue) {
    const depositRef = database.ref("deposits");
    depositRef.push(depositValue);
}

// Exibir os depósitos salvos
function displayDeposits() {
    const depositRef = database.ref("deposits");
    depositRef.on("value", function(snapshot) {
        const deposits = snapshot.val();
        depositList.innerHTML = "";
        for (let id in deposits) {
            const deposit = deposits[id];
            const listItem = document.createElement("li");
            listItem.textContent = `Depósito: R$${deposit}`;
            depositList.appendChild(listItem);
        }
    });
}

// Criar botões dinamicamente para os valores de 1 a 100
for (let i = 1; i <= 100; i++) {
    const button = document.createElement("button");
    button.classList.add("deposit-button");
    button.textContent = i;
    button.dataset.value = i;
    button.addEventListener("click", () => {
        saveDeposit(i);
    });
    buttonsContainer.appendChild(button);
}

// Exibir os depósitos logo após o carregamento da página
displayDeposits();
