import { db } from './db.js' // Ajuste o caminho se necessário
import {
  collection,
  getDocs
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js'

async function buscarStatus() {
  const statusArray = []
  try {
    const querySnapshot = await getDocs(collection(db, 'status')) // Referencia a coleção 'status'
    querySnapshot.forEach(doc => {
      statusArray.push({
        id: doc.id,
        ...doc.data() // Adiciona todos os campos do documento (ex: { nome: "Em análise" })
      })
    })
    return statusArray
  } catch (e) {
    console.error('Erro ao buscar status:', e)
    return []
  }
}

export { buscarStatus } // Exporte a função

// Cadastro Localidades
async function verificarStatus() {
  const statusRecebidos = await buscarStatus() // Chama a função e aguarda
  console.log('Dados de status recebidos:', statusRecebidos) // Exibe no console
}

verificarStatus()

async function popularSelectStatus() {
  const statusList = await buscarStatus() // Busca os status do Firebase
  const selectElement = document.getElementById('tipoEvte') // Pega o seu <select>

  if (selectElement) {
    // Verifica se o select existe
    statusList.forEach(status => {
      let option = document.createElement('option') // Cria um novo <option>
      option.value = status.id // O valor do option (ex: 'analise')
      option.textContent = status.nome // O texto visível (ex: 'Em análise')
      selectElement.appendChild(option) // Adiciona o option ao select
    })
  }
}

popularSelectStatus()
