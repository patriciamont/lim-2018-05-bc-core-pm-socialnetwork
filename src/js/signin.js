//********ESTE DOCUMENTO MANIPULA AL index.html********//

//VARIABLES
const email = document.getElementById('email')
const password = document.getElementById('password')
const btnSignin = document.getElementById('btnSignin')
const btnFacebook = document.getElementById('btnFacebook')
const btnGoogle = document.getElementById('btnGoogle')

btnSignin.addEventListener('click', (event) => {
  event.preventDefault(); // Prevenimos el refreso de pagina al darle al boton
  signIn(email.value, password.value)
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
