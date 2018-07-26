//********ESTE DOCUMENTO MANIPULA AL register.html********//

//VARIABLES
const passwordConfirm = document.getElementById('passwordConfirm')
const btnRegister = document.getElementById('register')
const btnFacebook = document.getElementById('btnFacebook')
const btnGoogle = document.getElementById('btnGoogle')
const email = document.getElementById('email')
const password = document.getElementById('password')

btnRegister.addEventListener('click', (event) => {
    event.preventDefault()
    register(email.value,password.value)
})

btnFacebook.addEventListener('click',()=>{
    signFacebook()
})

btnGoogle.addEventListener('click',()=>{
    signGoogle()
})
