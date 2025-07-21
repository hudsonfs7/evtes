let localidades = [
  { id: 1, nome: 'Teixeira de Freitas' },
  { id: 2, nome: 'Itamaraju' },
  { id: 3, nome: 'Eunápolis' },
  { id: 4, nome: 'Porto Seguro' }
]

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
    const selecionarLocalidade = document.getElementById('localidade')

    if (registrarEvte && modal && closeModal) {
      registrarEvte.onclick = () => (modal.style.display = 'block')
      closeModal.onclick = () => (modal.style.display = 'none')
      window.onclick = e => {
        if (e.target == modal) modal.style.display = 'none'
      }
    }

    if (selecionarLocalidade) {
      localidades.forEach(local => {
        const option = new Option(local.nome, local.id)
        selecionarLocalidade.add(option)
      })
    }
  })

// Cadastro Localidades
