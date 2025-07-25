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

// alert('Olá, Mundo!')

// Abrir Modal

fetch('../registrarEvte.html')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('beforeend', data)

    const modal = document.getElementById('modal')
    const closeModal = document.getElementById('closeModal')
    const cancelModal = document.getElementById('cancel')

    if (registrarEvte && modal && closeModal) {
      registrarEvte.onclick = () => (modal.style.display = 'block')
      closeModal.onclick = () => (modal.style.display = 'none')
      cancelModal.onclick = () => (modal.style.display = 'none')
      window.onclick = e => {
        if (e.target == modal) modal.style.display = 'none'
      }
    }
  })
