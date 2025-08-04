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

  celular.addEventListener('input', () => {
    // Remove todos os caracteres que não são números
    // (00) 9.0000-0000
    let valorLimpo = celular.value.replace(/\D/g, '')

    let valorFormatado = valorLimpo.substring(0, 11)

    if (valorLimpo.length > 0) {
      valorFormatado = '(' + valorLimpo.substring(0, 2)
    }
    if (valorLimpo.length > 2) {
      valorFormatado += ')' + valorLimpo.substring(2, 3)
    }
    if (valorLimpo.length > 3) {
      valorFormatado += '.' + valorLimpo.substring(3, 7)
    }
    if (valorLimpo.length > 7) {
      valorFormatado += '-' + valorLimpo.substring(7, 11)
    }

    celular.value = valorFormatado
  })
}

// FOOTER
const footer = document.querySelector('footer')

footer.innerHTML =
  '<p><strong>CadEVTE</strong> v1 &copy; 2025 - <a href="#">Huson Souza</a></p>'

// SIDEBAR
const sideBar = document.querySelector('section')

sideBar.innerHTML = '<h2>Sidebar</h2> <p>[...].</p>'
