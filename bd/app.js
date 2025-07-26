import { db } from './db.js' // Ajuste o caminho se necessário
import {
  collection,
  getDocs,
  addDoc
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
const statusList = await buscarStatus() // Busca os status do Firebase

let localidades = [
  { id: 1, nome: 'Teixeira de Freitas' },
  { id: 2, nome: 'Itamaraju' },
  { id: 3, nome: 'Eunápolis' },
  { id: 4, nome: 'Porto Seguro' }
]

let tiposDeSolicitacao = [
  { id: 1, nome: 'Nova Solicitação' },
  { id: 2, nome: 'Renovação' },
  { id: 3, nome: 'Retificação' },
  { id: 4, nome: 'MCMV' }
]

function popularSelect(name, list) {
  const nameSelect = document.querySelector(`[name=${name}]`)

  list.forEach(item => {
    let option = document.createElement('option')
    option.value = item.id
    option.textContent = item.nome

    nameSelect.appendChild(option)
  })
}

popularSelect('localidades', localidades)
popularSelect('status', statusList)
popularSelect('tipoEvte', tiposDeSolicitacao)

const novaEvte = {
  empreendimento: 'Olimpo',
  empresa: 'DSOs',

  nomeInteressado: 'Hudson',
  telefone: '73982025560',
  email: 'hudsonfs7@hotmail.com',
  celular: '73982025560',

  tipo: 'Nova Solicitação',
  status: ' Em análise',
  localidade: 'Itamaraju',
  protocolo: '0000000000000',
  data: '25/07/2025'
}

function registrarNovaEvte() {
  const empreendimento = document.querySelector('[name=empreendimento]').value
  const empresa = document.querySelector('[name=empresa]').value

  const nomeInteressado = document.querySelector('[name=nomeInteressado]').value
  const telefone = document.querySelector('[name=telefone]').value
  const email = document.querySelector('[name=email]').value
  const celular = document.querySelector('[name=celular]').value

  const tipo = document.querySelector('[name=tipoEvte]').value
  const status = document.querySelector('[name=status]').value
  const localidade = document.querySelector('[name=localidades]').value
  const protocolo = document.querySelector('[name=protocolo]').value
  const data = document.querySelector('[name=data]').value

  return {
    empreendimento,
    empresa,
    nomeInteressado,
    telefone,
    email,
    celular,
    tipo,
    status,
    localidade,
    protocolo,
    data
  }
}

async function salvarNovaEvte() {
  try {
    const docRef = await addDoc(collection(db, 'evtes'), novaEvte)
    console.log('Documento escrito com ID: ', docRef.id)
    return docRef.id
  } catch (e) {
    console.error('Erro ao adicionar documento:', e)
    return null
  }
}

const formNovaEvte = document.getElementById('modal')

formNovaEvte.addEventListener('submit', event => {
  event.preventDefault()

  const dados = registrarNovaEvte()
  salvarNovaEvte(dados)
})
// salvarNovaEvte(registrarNovaEvte())
