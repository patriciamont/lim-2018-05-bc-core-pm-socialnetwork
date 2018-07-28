//*********AQUÍ SE ALMANECERAN LAS FUNCIONES GENERALES *********/

//FUNCIÓN que te conecta al perfil


//FUNCIÓN registro con usuario y contraseña
window.register = (email, password, other) => {
  if (password === other) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        console.log('se creó un usuario')
        window.location.href = 'profile.html'
      })
      .catch(function (error) {
        console.log('no se creo')
        console.log(error.code, error.message)
      })
  } else {
    alert('no es la misma contraseña')
  }
}

//FUNCIÓN ingresar con usuario y contraseña creado
window.signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      /* window.location = 'profile.html' */
      console.log('usuario registrado inició sesión')
    })
    .catch(function (error) {
      console.log(error.code, error.message)
    })
}

//FUNCIÓN que guarda de datos generales del usuario
const writeUserData = (userId, name, email, imageUrl) => {
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    })
}

//FUNCIÓN loguearse con google
window.signGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {

      console.log('Sesión con google')
      var user = result.user
      writeUserData(user.uid, user.displayName, user.email, user.photoURL)
      /* console.log(user) */
      /*  window.location.href = 'profile.html' */
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.code)
      console.log(error.message)
      // The email of the user's account used.
      console.log(error.email)
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credential)
      // ...
    })
}

//FUNCIÓN loguease con facebook
window.signFacebook = (callback) => {
  var provider = new firebase.auth.FacebookAuthProvider()

/*   provider.setCustomParameters({
    display: 'popup'
  }) */
  provider.addScope('user_birthday')

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log('Logueado con Fb')
      /*  callback(result) */
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.code)
      console.log(error.message)
      // The email of the user's account used.
      console.log(error.email)
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credential)
      // ...
    })
}

//FUNCIÓN que cierra sesión
window.logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Cerro Sesión')
      window.location.href = 'index.html'

    })
    .catch((error) => {
      console.log('Error al cerrar Sesión')
    })
}

//FUNCIÓN que crea nuevo post

//FUNCIÓN para editar post

//FUNCIÓN para elimar post

//FUNCIÓN PARA mostrar post

//FUNCIÓN para dar like

//FUNCIÓN para cambiar privacidad de post 

//FUNCIÓN para agregar amigos
