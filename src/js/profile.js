//

const login = document.getElementById('login');
const logout = document.getElementById('logout');

const btnLogout = document.getElementById("btnlogout");
const btnSignin = document.getElementById("btnSignin");
const register = document.getElementById("register");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnGoogle = document.getElementById('btnGoogle');
const btnFb = document.getElementById('btnFb');
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');
var userName=document.getElementById('user-name');
var userImage=document.getElementById('user-pic');


window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      console.log('User is signed in.');

      var displayName = user.displayName;
      var userPhoto = user.photoURL;

      userName.textContent=displayName;
      userImage.style.backgroundImage
      /*       login.classList.add("hiden");
      bd.classList.remove("hiden");
      posts.classList.remove("hiden");
      logout.classList.remove("hiden");
      user_name.innerHTML = `Bienvenida ${user.displayName}` */;
    } else {
      window.location.href="index.html"
      console.log('No esta logueado');
/*       login.classList.remove("hiden");
      logout.classList.add("hiden");
      posts.classList.add("hiden");
      bd.classList.add("hiden") */
    }
  });

}

/* 
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
} */


function writeNewPost(uid, body) {
  // A post entry.
  var postData = {
    uid: uid,
    body: body,
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  return newPostKey;
}

btnSave.addEventListener('click', () => {
  var userId = firebase.auth().currentUser.uid;
  const newPost = writeNewPost(userId, post.value);


  var btnUpdate = document.createElement("input");
  
  btnUpdate.setAttribute("value", "Editar");
  btnUpdate.setAttribute("type", "button");
  var btnDelete = document.createElement("input");
  btnDelete.setAttribute("value", "Eliminar");
  btnDelete.setAttribute("type", "button");
  var contPost = document.createElement('div');
  var textPost = document.createElement("p")
  textPost.setAttribute("id", newPost);
 
  const btnLike=document.createElement("a");
  const showLikes=document.createElement('p');
  showLikes.setAttribute('id', 'clicks');
  textPost.innerHTML=post.value;
  btnLike.textContent="Me gusta";
  btnLike.setAttribute('data-like','0');


  

  btnUpdate.addEventListener('click', () => {
    textPost.setAttribute('contenteditable',true);
    const newUpdate = document.getElementById(newPost);
    const nuevoPost = {
      body: newUpdate.value,
    };

    var updatesUser = {};
    var updatesPost = {};

    updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
    updatesPost['/posts/' + newPost] = nuevoPost;

    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost);

  })

  btnDelete.addEventListener('click', () => {

    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
    firebase.database().ref().child('posts/' + newPost).remove();

    while (posts.firstChild) posts.removeChild(posts.firstChild);

    alert('El usuario borró post!');
    reload_page();

  });


  btnLike.addEventListener('click',(e)=>{
    e.preventDefault;

    var currentStatus=e.target.getAttribute('data-like'); //0
    if (currentStatus === '0') {
      e.target.nextElementSibling.innerHTML = `${1} Te gusta`;
      e.target.setAttribute('data-like', '1');
  } else {
      e.target.nextElementSibling.innerHTML = '';
      e.target.setAttribute('data-like', '0');
  }
  })

  contPost.appendChild(textPost);
  contPost.appendChild(btnUpdate);
  contPost.appendChild(btnDelete);
  contPost.appendChild(btnLike);
  contPost.appendChild(showLikes);
  posts.appendChild(contPost);

})



/* register.addEventListener('click', () =>{
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function () {
      console.log('Se creo el usuario')
    })
    .catch(function (error) {
      console.log(error.code, error.message)
    });
  })
 */

/*btnSignin.addEventListener('click', () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(function (){
    console.log('Inició Sesión');
  })
  .catch(function(error) {
    console.log('Contraseña incorrecta');
  });
})*/

btnLogout.addEventListener('click', () => {
  firebase.auth().signOut().then(function() {
    console.log('Cerro Sesión');
  }).catch(function(error) {
    console.log('Error al cerrar Sesión');
  });
})
/* btnGoogle.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();
    
    provider.setCustomParameters({
      'display' : 'popup'
    });
  firebase.auth().signInWithPopup(provider).then(function(result){
    
    console.log('Inicio sesión con google')
    var user = result.user;
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);

  }).catch(function(error){
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
    

  });
}) */

/* btnFb.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();

  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
  .then(function (result) { console.log('Inicio sesión con facebook')

  }).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
  });

}); */
function reload_page() {
  window.location.reload();
}
