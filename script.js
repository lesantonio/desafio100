// script.js

// Importando e inicializando o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Gera os 100 botões dinamicamente
const container = document.getElementById('buttons-container');

// Certifique-se de que o container esteja disponível
if (container) {
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('deposit-button');
        button.addEventListener('click', () => handleButtonClick(i));
        container.appendChild(button);
    }
}

// Função que é chamada ao clicar em um botão
async function handleButtonClick(value) {
    try {
        const depositRef = ref(database, 'deposits/' + value);
        await set(depositRef, {
            value: value,
            timestamp: Date.now()
        });

        alert(`Depósito ${value} registrado com sucesso!`);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao registrar o depósito.');
    }
}
