//********ESTE DOCUMENTO MANIPULA AL register.html********//

//VARIABLES
const passwordConfirm = document.getElementById('passwordConfirm')
const btnRegister = document.getElementById('register')
const btnFacebook = document.getElementById('btnFacebook')
const btnGoogle = document.getElementById('btnGoogle')
const email = document.getElementById('email')
const password = document.getElementById('password')

btnRegister.addEventListener('click', event => {
  event.preventDefault()
  register(email.value, password.value, passwordConfirm.value)
})

btnFacebook.addEventListener('click', () => {
  const callback = result => {
    /* location.href = 'profile.html' */
    let user = result.user
    writeUserData(user.uid, user.displayName, user.email, user.photoURL)
    /* window.location = 'profile.html' */
  }
  signFacebook(callback)
})

btnGoogle.addEventListener('click', () => {
  signGoogle()
})
