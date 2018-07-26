//********ESTE DOCUMENTO MANIPULA AL index.html********//

//VARIABLES
const email = document.getElementById('email')
const password = document.getElementById('password')
const btnSignin = document.getElementById('btnSignin')
const btnFacebook = document.getElementById('btnFacebook')
const btnGoogle = document.getElementById('btnGoogle')

btnSignin.addEventListener('click',()=>{
    event.preventDefault()
    signIn(email.value,password.value)
})

btnFacebook.addEventListener('click',()=>{
    signFacebook()
})

btnGoogle.addEventListener('click',()=>{
    signGoogle()
})
