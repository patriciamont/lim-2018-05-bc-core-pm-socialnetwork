//*********AQUÍ SE ALMANECERAN LAS FUNCIONES GENERALES *********/

//FUNCIÓN que te conecta al perfil


//FUNCIÓN registro con usuario y contraseña
window.register = (email, password, callback) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      console.log('Usuario creado al autentificador', result);
      callback(result); // Ejecutamos la funcion callback
    })
    .catch(function(error) {
      //Si el error es que el correo no es valido mostramos un alert
      if (error.code === 'auth/invalid-email') {
        alert('Correo invalido');
      }

      //Si el error es que la contraseña es muy débil mostramos un alert
      if (error.code === 'auth/weak-password') {
        alert('contraseña no valida debe contener al menos 6 caracteres');
      }

      //Si el email ya esta siendo usado también mostramos un alert
      if (error.code === 'auth/email-already-in-use') {
        alert('El email ya esta en uso');
      }
    });
};

//FUNCIÓN ingresar con usuario y contraseña creado
window.signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      location.href = 'profile.html'
    })
    .catch(function (error) {
      alert('Correo o contraseña invalida')
    })
}

//FUNCIÓN que guarda de datos generales del usuario
const writeUserData = (userId, name, email, imageUrl) => {

  /* Hacemos un set para guardar los datos del usuario, podriamos pasar mas
  parametros para guardar mas informacion */
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    })
    .then(function(data) {
      /* Con el then esperamos a que estos datos sean guardados antes
      de redirrecionar a la siguiente pagina */
      location.href = 'profile.html';
    });
};

//FUNCIÓN loguearse con google
window.signGoogle = callback => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    display: 'popup'
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log('Sesión con google');
      callback(result);
      /* var user = result.user; */
      console.log(user);
      /* writeUserData(user.uid, user.displayName, user.email, user.photoURL); */
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      // The email of the user's account used.
      console.log(error.email);
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credential);
      // ...
    });
};

//FUNCIÓN loguease con facebook
window.signFacebook = callback => {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    display: 'popup'
  });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log('Logueado con Fb');
      callback(result);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      // The email of the user's account used.
      console.log(error.email);
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credential);
      // ...
    });
};

//FUNCIÓN que cierra sesión
window.logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Cerro Sesión')
      window.location ='index.html'


    })
    .catch((error) => {
      console.log('Error al cerrar Sesión')
    })
}

//FUNCIÓN que crea nuevo post
/* window.writeNewPost = (uid, body) => {
  // A post entry.
  var postData = {
    uid: uid,
    body: body
  }
} */

//FUNCIÓN para editar post

//FUNCIÓN para elimar post



//FUNCIÓN PARA mostrar post

//FUNCIÓN para dar like
window.like = () => {
  var currentStatus = e.target.getAttribute('data-like') //0
    if (currentStatus === '0') {
      e.target.nextElementSibling.innerHTML = `${1} Te gusta`
      e.target.setAttribute('data-like', '1')
    } else {
      e.target.nextElementSibling.innerHTML = ''
      e.target.setAttribute('data-like', '0')
    }
  }
//FUNCIÓN para cambiar privacidad de post 

//FUNCIÓN para agregar amigos