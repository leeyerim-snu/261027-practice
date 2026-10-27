import './style.css'

const menuButton = document.querySelector('.menu-toggle')
const navigation = document.querySelector('#navigation')

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false')
  navigation.classList.remove('is-open')
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!isOpen))
  navigation.classList.toggle('is-open', !isOpen)
})

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu()
    menuButton.focus()
  }
})

const desktopQuery = window.matchMedia('(min-width: 701px)')
desktopQuery.addEventListener('change', (event) => {
  if (event.matches) closeMenu()
})

const copyButton = document.querySelector('.copy-email')
const copyStatus = document.querySelector('#copy-status')
let resetTimer

copyButton.addEventListener('click', async () => {
  const email = document.querySelector('#email-link').textContent.trim()
  clearTimeout(resetTimer)
  copyStatus.textContent = ''

  try {
    await navigator.clipboard.writeText(email)
    copyStatus.textContent = '이메일 주소를 복사했습니다.'
    copyButton.textContent = '복사 완료 ✓'
  } catch {
    copyStatus.textContent = `주소를 직접 선택해 주세요: ${email}`
  }

  resetTimer = setTimeout(() => {
    copyButton.textContent = '주소 복사 ↗'
  }, 2500)
})

document.querySelector('#year').textContent = new Date().getFullYear()
