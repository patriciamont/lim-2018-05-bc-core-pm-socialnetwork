
const btnSignin = document.getElementById("btnSignin");
const btnRegister = document.getElementById("btnRegister");
const email = document.getElementById("email");
const password = document.getElementById("password");



/*window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            login.classList.remove("hiden");
            logout.classList.add("hiden bt");
            console.log('Inicio Logueado ')
        } else {
            console.log('No esta logueado');
            login.classList.add("hiden");
            logout.classList.remove("hiden");
        }
    });
}*/

btnRegister.addEventListener('click', () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log('Se creo el usuario')
        })
        .catch(function (error) {
            console.log(error.code, error.message)
        });
});

btnSignin.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log('Inicia Sesion');
        })
        .catch(function (error) {
            console.log(error.code, error.message);
        });
});

