import { db } from './db.js' // Ajuste o caminho se necessário
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js'

// ABRIR MODAL VIEW
fetch('../modals/viewEvte.html')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('beforeend', data)

    const modalView = document.getElementById('modalView')
    const closeModalView = document.getElementById('closeModalView')

    closeModalView.onclick = () => {
      modalView.style.display = 'none'
      estabilizeModal()
    }

    window.onclick = e => {
      if (e.target == modalView) {
        estabilizeModal()
        modalView.style.display = 'none'
      }
    }
  })

// ABRIR MODAL REGISTRO
fetch('../modals/registrarEvte.html')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('beforeend', data)

    const modal = document.getElementById('modal')
    const closeModal = document.getElementById('closeModal')
    const cancelModal = document.getElementById('cancel')

    if (registrarEvte && modal && closeModal) {
      registrarEvte.onclick = () => {
        modal.style.display = 'block'
        zerarForm()
      }
      closeModal.onclick = () => (modal.style.display = 'none')
      cancelModal.onclick = () => (modal.style.display = 'none')
      window.onclick = e => {
        if (e.target == modal) {
          modal.style.display = 'none'
        }
      }
    }
  })

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

// CONVERSOR DE PADRÃO DE DATA
function formatarDataParaPtBr(dataFormat) {
  if (!dataFormat) return ''

  if (dataFormat.includes('-')) {
    const [ano, mes, dia] = dataFormat.split('-')
    return `${dia}/${mes}/${ano}`
  } else if (dataFormat.includes('/')) {
    const [dia, mes, ano] = dataFormat.split('/')
    return `${ano}-${dia}-${mes}`
  } else {
    return dataFormat
  }
}

// DATA VIEW TEXT OR DATE
function whatTypeOfDate(dateType) {
  if (dateType.lenght == 4) {
  }
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
    if (item.data().data.includes('-')) {
      return item.data().data.startsWith(anoEscolhido)
    } else {
      return item.data().data.endsWith(anoEscolhido)
    }
  })

  snapFiltrado.forEach(item => {
    const dados = item.data()
    let dataFormatada = formatarDataParaPtBr(dados.data)

    const newLine = `
      <tr id="${item.id}">
        <td class="dados_empreendimento">${dados.empreendimento}</td>
        <td class="dados_empresa">${dados.empresa}</td>
        <td class="dados_nomeInteressado">${dados.nomeInteressado}</td>
        
        
        
        
        <td class="dados_status">${dados.status}</td>
        <td class="dados_localidade">${dados.localidade}</td>
        
        <td class="dados_data">${dataFormatada}</td>
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
let dataVtView = document.querySelector('[name=dataVtView]')
let numberEvte = document.querySelector('[name=inforevte]')

// ID LINHA SELECIONADA
let idLinhaSelecionada = ''
const buttonVisualizar = document.querySelector('[id=verDados]')

tbodyTabela.addEventListener('click', event => {
  const linhaClicada = event.target.closest('tr')

  const linhaClicadaAnterior = document.querySelector(
    '[class=linhaSelecionada]'
  )

  if (linhaClicada) {
    if (linhaClicadaAnterior === linhaClicada) {
      // Se a linha clicada já for a selecionada, deseleciona
      linhaClicada.classList.remove('linhaSelecionada')
      buttonVisualizar.classList.add('ocultar')
    } else {
      // Caso contrário, remove a seleção da anterior (se existir)
      if (linhaClicadaAnterior) {
        linhaClicadaAnterior.classList.remove('linhaSelecionada')
        buttonVisualizar.classList.add('ocultar')
      }
      // E adiciona a seleção à nova linha clicada
      linhaClicada.classList.add('linhaSelecionada')
      buttonVisualizar.classList.remove('ocultar')
    }
  }

  idLinhaSelecionada = linhaClicada.id
})

// POPULAR A MODAL VIEW COM OS DADOS DE 01 LINHA SELECIONADA
async function showView(id) {
  try {
    const consultaDocView = doc(db, 'evtes', id)
    const snapDocView = await getDoc(consultaDocView)
    const dadosDocView = snapDocView.data()

    if (dadosDocView.vt === undefined) {
      numberEvte.value = 'NÃO EMITIDA'
    } else {
      numberEvte.value = dadosDocView.vt
    }

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
    dataView.value = formatarDataParaPtBr(dadosDocView.data)
    dataVtView.value = formatarDataParaPtBr(dadosDocView.data_vt)
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

// EDITAR NO BD
async function editarEvte(idDoDocumento, dadosAtualizados) {
  try {
    const docRef = doc(db, 'evtes', idDoDocumento)
    await updateDoc(docRef, dadosAtualizados)
    console.log('Documento atualizado com sucesso! ID:', idDoDocumento)
    return true
  } catch (e) {
    console.error('Erro ao atualizar documento:', e)
    return false
  }
}

// DELETAR NO BD
async function deleteEvte(idDoDocumento) {
  try {
    const docRef = doc(db, 'evtes', idDoDocumento)
    await deleteDoc(docRef)
    console.log('Documento excluído com sucesso! ID:', idDoDocumento)
    return true
  } catch (e) {
    console.error('Erro ao atualizar documento:', e)
    return false
  }
}

const updateButton = document.querySelector('[id=updateView]')

function allowEdit() {
  numberEvte.removeAttribute('readonly')

  empreendimentoView.removeAttribute('readonly')
  empresaView.removeAttribute('readonly')

  nomeInteressadoView.removeAttribute('readonly')
  telefoneView.removeAttribute('readonly')
  emailView.removeAttribute('readonly')
  celularView.removeAttribute('readonly')

  tipoView.removeAttribute('readonly')
  statusView.removeAttribute('readonly')
  localidadeView.removeAttribute('readonly')
  protocoloView.removeAttribute('readonly')
  dataView.removeAttribute('readonly')
  dataVtView.removeAttribute('readonly')
}

function disableEdit() {
  numberEvte.setAttribute('readonly', 'readonly')

  empreendimentoView.setAttribute('readonly', 'readonly')
  empresaView.setAttribute('readonly', 'readonly')

  nomeInteressadoView.setAttribute('readonly', 'readonly')
  telefoneView.setAttribute('readonly', 'readonly')
  emailView.setAttribute('readonly', 'readonly')
  celularView.setAttribute('readonly', 'readonly')

  tipoView.setAttribute('readonly', 'readonly')
  statusView.setAttribute('readonly', 'readonly')
  localidadeView.setAttribute('readonly', 'readonly')
  protocoloView.setAttribute('readonly', 'readonly')
  dataView.setAttribute('readonly', 'readonly')
  dataVtView.setAttribute('readonly', 'readonly')
}

// GETS BOTÕES DE FUNÇÕES DA MODAL VIEW
const editButton = document.querySelector('[id=editView]')
const cancelButton = document.querySelector('[id=cancelView]')
const deleteButton = document.querySelector('[id=removeButtonView]')

// FUNÇÃO EDITAR
editButton.addEventListener('click', event => {
  updateButton.classList.remove('ocultar')
  cancelButton.classList.remove('ocultar')
  editButton.classList.add('ocultar')
  deleteButton.classList.remove('ocultar')
  allowEdit()
})

// FUNÇÃO CANCELAR
cancelButton.addEventListener('click', event => {
  editButton.classList.remove('ocultar')
  cancelButton.classList.add('ocultar')
  updateButton.classList.add('ocultar')
  deleteButton.classList.add('ocultar')

  disableEdit()
})

function estabilizeModal() {
  editButton.classList.remove('ocultar')
  cancelButton.classList.add('ocultar')
  updateButton.classList.add('ocultar')
  deleteButton.classList.add('ocultar')
  buttonVisualizar.classList.add('ocultar')

  disableEdit()
  popularTabela()
}

function editEvte() {
  const editeFormView = {
    empreendimento: empreendimentoView.value,
    empresa: empresaView.value,

    nomeInteressado: nomeInteressadoView.value,
    telefone: telefoneView.value,
    email: emailView.value,
    celular: celularView.value,

    tipo: tipoView.value,
    status: statusView.value,
    localidade: localidadeView.value,
    protocolo: protocoloView.value,
    data: dataView.value,
    vt: numberEvte.value
  }

  return editeFormView
}

updateButton.addEventListener('click', event => {
  event.preventDefault()
  const dadosEditView = editEvte()
  editarEvte(idLinhaSelecionada, dadosEditView)
  updateButton.classList.add('ocultar')
  popularTabela()
  disableEdit()
})

deleteButton.addEventListener('click', event => {
  let resultado = confirm('Tem certeza que deseja continuar?')

  if (resultado) {
    // Código a ser executado se o usuário clicar em "OK"
    console.log('Ação confirmada!')
    event.preventDefault(deleteEvte(idLinhaSelecionada))
    estabilizeModal()
    modalView.style.display = 'none'
  } else {
    // Código a ser executado se o usuário clicar em "Cancelar"
    console.log('Ação cancelada.')
  }
})
