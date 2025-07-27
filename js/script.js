// import { buscarStatus } from '../bd/app.js'

const openMenu = document.getElementById('openMenu')
const closeMenu = document.getElementById('closeMenu')

const nav = document.querySelector('nav')
const ul = document.querySelector('ul')

const registrarEvte = document.getElementById('registrarEvte')

openMenu.addEventListener('click', () => {
  openMenu.classList.add('active')
  nav.classList.add('active')
  ul.classList.add('active')
  closeMenu.classList.add('closeMenuActive')
})

closeMenu.addEventListener('click', () => {
  openMenu.classList.remove('active')
  nav.classList.remove('active')
  ul.classList.remove('active')
  closeMenu.classList.remove('closeMenuActive')
})

// Abrir Modal

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

fetch('../registrarEvte.html')
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

const telInput = document.querySelector('[name=form-celular]')

telInput.addEventListener('input', () => {
  alert('oi')
  let valorLimpo = telInput.value.replace(/\D/g, '')
  valorLimpo = valorLimpo.substring(0, 11)

  let valorFormatado = ''

  if (valorLimpo.length > 0) {
    valorFormatado = +'(' + valorLimpo.substring(0, 2)
  }
  if (valorLimpo.length > 0) {
    valorFormatado = +')' + valorLimpo.substring(3, 7)
  }
  if (valorLimpo.length > 7) {
    valorFormatado = +'-' + valorFormatado.substring(7, 11)
  }

  telInput.value = valorFormatado
})
