//********ESTE DOCUMENTO MANIPULA AL index.html********//

//VARIABLES
const email = document.getElementById('email')
const password = document.getElementById('password')
const btnSignin = document.getElementById('btnSignin')
const btnFacebook = document.getElementById('btnFacebook')
const btnGoogle = document.getElementById('btnGoogle')



btnSignin.addEventListener('click', () => {
  event.preventDefault()
  signIn(email.value, password.value)
})

btnFacebook.addEventListener('click', () => {
  const callback = result => {
    location.href = 'profile.html' 
    let user = result.user
    writeUserData(user.uid, user.displayName, user.email, user.photoURL)
    /* window.location = 'profile.html' */
  }
  const facebook = signFacebook(callback)
})

btnGoogle.addEventListener('click', () => {
  signGoogle()
})

const observador = () => {
  firebase.auth().onAuthStateChanged(
    (user) => {


      if (user) {
        window.location = 'profile.html'
        console.log('redirijo')
      } else {
        console.log('No esta logueado')
      }
    }
  )
} 
observador()
