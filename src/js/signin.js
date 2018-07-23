const btnSignin = document.getElementById("btnSignin");
btnSignin.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log('Inició Sesión');
        })
        .catch(function (error) {
            console.log('Contraseña incorrecta');
        });
})