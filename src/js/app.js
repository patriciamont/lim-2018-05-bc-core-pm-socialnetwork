//*********AQUÍ SE ALMANECERAN LAS FUNCIONES GENERALES *********/

//APRENDIENDO a crear callbacks

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

      //Si el error es que la contraseña es muy debil mostramos un alert
      if (error.code === 'auth/weak-password') {
        alert('contraseña no valida debe contener al menos 6 caracteres');
      }

      //Si el email ya esta siendo usado tambien mostramos un alert
      if (error.code === 'auth/email-already-in-use') {
        alert('El email ya esta en uso');
      }
    });
};

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

//FUNCIÓN ingresar con usuario y contraseña creado
window.signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(data) {
      console.log(data);
      // Cuando el inicio de sesion sea exitoso lo mandamos al profile.html
      location.href = 'profile.html';
    })
    .catch(function(error) {
      console.log(error);
      // No existe el usuario y la contraseña
      alert('No existe el usuario y la contraseña');
    });
};

//FUNCIÓN loguearse con google
window.signGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      window.location.href = 'profile.html';
      console.log('Sesión con google');
      var user = result.user;
      console.log(user);
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);
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

//FUNCIÓN que crea nuevo post

//FUNCIÓN para editar post

//FUNCIÓN para elimar post

//FUNCIÓN PARA mostrar post

//
