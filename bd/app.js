import { db } from './db.js' // Ajuste o caminho se necessário
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  getDoc
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
    // option.value = item.id
    option.textContent = item.nome

    nameSelect.appendChild(option)
  })
}

popularSelect('localidades', localidades)
popularSelect('status', statusList)
popularSelect('tipoEvte', tiposDeSolicitacao)

function registrarNovaEvte() {
  const dadosFormCad = {
    empreendimento: document.querySelector('[name=form-empreendimento]').value,
    empresa: document.querySelector('[name=form-empresa]').value,

    nomeInteressado: document.querySelector('[name=form-interessado]').value,
    telefone: document.querySelector('[name=form-telefone]').value,
    email: document.querySelector('[name=form-email]').value,
    celular: document.querySelector('[name=form-celular]').value,

    tipo: document.querySelector('[name=tipoEvte]').value,
    status: document.querySelector('[name=status]').value,
    localidade: document.querySelector('[name=localidades]').value,
    protocolo: document.querySelector('[name=form-protocolo]').value,
    data: document.querySelector('[name=form-data]').value
  }

  return dadosFormCad
}

function zerarForm() {
  // All GETs
  let empreendimento = document.querySelector('[name=form-empreendimento]')
  let empresa = document.querySelector('[name=form-empresa]')

  let nomeInteressado = document.querySelector('[name=form-interessado]')
  let telefone = document.querySelector('[name=form-telefone]')
  let email = document.querySelector('[name=form-email]')
  let celular = document.querySelector('[name=form-celular]')

  let tipo = document.querySelector('[name=tipoEvte]')
  let status = document.querySelector('[name=status]')
  let localidade = document.querySelector('[name=localidades]')
  let protocolo = document.querySelector('[name=form-protocolo]')
  let data = document.querySelector('[name=form-data]')

  // Limpar os campos do formulário
  empreendimento.value = ''
  empresa.value = ''

  nomeInteressado.value = ''
  telefone.value = ''
  email.value = ''
  celular.value = ''

  tipo.value = ''
  status.value = ''
  localidade.value = ''
  protocolo.value = ''
  data.value = ''
}

function atualizarPagina() {
  location.reload()
}

async function salvarNovaEvte(dadosEVTE) {
  try {
    const docRef = await addDoc(collection(db, 'evtes'), dadosEVTE)
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
  salvarNovaEvte(dados).then(not => {
    if (not) {
      alert('EVTE Registrada com sucesso!')
      // formNovaEvte.style.display = 'none'
      zerarForm()
      // atualizarPagina()
    } else {
      alert('Erro ao salvar')
    }
  })
})

// Estudar o filter para SNAPSHOT e melhorar o Código

const getAno = document.getElementById('anoCadastro')

let anoEscolhido = document.getElementById('anoCadastro').value
getAno.addEventListener('change', event => {
  if (getAno.value === 'todos') anoEscolhido = ''
  else anoEscolhido = document.getElementById('anoCadastro').value

  popularTabela()
})

// Função pupular linhas da tabela com as informações do BD
async function popularTabela() {
  const tbody = document.querySelector('[name=list-evtes]')

  tbody.innerHTML = ''

  const consulta = query(collection(db, 'evtes'), orderBy('data', 'desc'))
  const querySnapshot = await getDocs(consulta)

  const snapFiltrado = querySnapshot.docs.filter(item => {
    return item.data().data.endsWith(anoEscolhido)
  })

  snapFiltrado.forEach(item => {
    const dados = item.data()

    const newLine = `
      <tr id="${item.id}">
        <td class="dados_empreendimento">${dados.empreendimento}</td>
        <td class="dados_empresa">${dados.empresa}</td>
        <td class="dados_nomeInteressado">${dados.nomeInteressado}</td>
        
        
        <td class="dados_celular">${dados.celular}</td>
        
        <td class="dados_status">${dados.status}</td>
        <td class="dados_localidade">${dados.localidade}</td>
        
        <td class="dados_data">${dados.data}</td>
      </tr>
    `
    tbody.innerHTML += newLine
  })
}

popularTabela()

// MOSTRAR 01 EVTE NA MODAL
const tbodyTabela = document.querySelector('[name=list-evtes]')

// GETS DADOS EVTES
let empreendimentoView = document.querySelector('[name=empreendimentoView]')
let empresaView = document.querySelector('[name=empresaView]')

let nomeInteressadoView = document.querySelector('[name=interessadoView]')
let telefoneView = document.querySelector('[name=telefoneView]')
let emailView = document.querySelector('[name=emailView]')
let celularView = document.querySelector('[name=celularView]')

let tipoView = document.querySelector('[name=tipoEvteView]')
let statusView = document.querySelector('[name=statusView]')
let localidadeView = document.querySelector('[name=localidadesView]')
let protocoloView = document.querySelector('[name=protocoloView]')
let dataView = document.querySelector('[name=dataView]')

// ID LINHA SELECIONADA
let idLinhaSelecionada = ''

tbodyTabela.addEventListener('click', event => {
  const linhaClicada = event.target.closest('tr')

  const linhaClicadaAnterior = document.querySelector(
    '[class=linhaSelecionada]'
  )

  if (linhaClicadaAnterior) {
    linhaClicada.classList.toggle('linhaSelecionada')
    linhaClicadaAnterior.classList.remove('linhaSelecionada')
  } else {
    linhaClicada.classList.toggle('linhaSelecionada')
  }

  idLinhaSelecionada = linhaClicada.id
})

async function showView(id) {
  try {
    const consultaDocView = doc(db, 'evtes', id)
    const snapDocView = await getDoc(consultaDocView)
    const dadosDocView = snapDocView.data()

    empreendimentoView.value = dadosDocView.empreendimento
    empresaView.value = dadosDocView.empresa

    nomeInteressadoView.value = dadosDocView.nomeInteressado
    telefoneView.value = dadosDocView.telefone
    emailView.value = dadosDocView.email
    celularView.value = dadosDocView.celular

    tipoView.value = dadosDocView.tipo
    statusView.value = dadosDocView.status
    localidadeView.value = dadosDocView.localidade
    protocoloView.value = dadosDocView.protocolo
    dataView.value = dadosDocView.data
  } catch (e) {
    console.error('Erro ao buscar documento:', e)

    return null
  }
}

// BOTÃO VIEW EVTE
let viewEvteButton = document.querySelector('[id=verDados]')
viewEvteButton.addEventListener('click', event => {
  showView(idLinhaSelecionada)

  modalView.style.display = 'block'
  
})
