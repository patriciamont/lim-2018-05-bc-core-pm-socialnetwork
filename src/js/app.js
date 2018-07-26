//*********AQUÍ SE ALMANECERAN LAS FUNCIONES GENERALES *********/

//FUNCIÓN registro con email y password
window.register = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)

        .then(function () {
            //window.location="profile.html"
            console.log('se creó un usuario')
        })
        .catch(function (error) {
            console.log(error.code, error.message)
        });
}


//FUNCIÓN ingresar con usuario y contraseña creado
window.signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            window.location = "profile.html"
            console.log('usuario registrado inició sesión')
        })
        .catch(function (error) {
            console.log(error.code, error.message)
        })
}

//FUNCIÓN que llama a los datos de google

/* const writeUserData = (userId, name, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
} */

//FUNCIÓN loguearse con google
window.signGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            window.location.href = "profile.html"
            console.log('Sesión con google');
            window.location = 'profile.html';
            var user = result.user;
            /*    writeUserData(user.uid, user.name, user.email, user.imageUrl);
                {
               firebase.database().ref('users/' + userId).set({
                username: name,
                 email: email,
                 profile_picture : imageUrl
               });
           } */

        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            // The email of the user's account used.
            console.log(error.email);
            // The firebase.auth.AuthCredential type that was used.
            console.log(error.credential);
            // ...
        });
}

//FUNCIÓN loguease con facebook
window.signFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({

        'display': 'popup'

    });

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log('Logueado con Fb');
            window.location = "profile.html";
        })

        .catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            // The email of the user's account used.
            console.log(error.email);
            // The firebase.auth.AuthCredential type that was used.
            console.log(error.credential);
            // ...
        });
}