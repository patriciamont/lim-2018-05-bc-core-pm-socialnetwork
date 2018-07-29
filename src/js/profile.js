//********ESTE DOCUMENTO MANIPULA AL profile.html********//

//VARIABLES
const btnLogout = document.getElementById('btnlogout');
const bd = document.getElementById('bd');
const btnToPost = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');
var userName = document.getElementById('user-name');
var userImage = document.getElementById('user-pic');
var emailUser = document.getElementById('emailUser');

//Funcion para cargar los post creados y publicos
let loadPosts = () => {
  var myUserId = firebase.auth().currentUser.uid;

  /* Obtenemos la data de todos los post dentro de la base de datos*/

  firebase
    .database()
    .ref('user-posts/' + myUserId)
    .once('value')
    .then(snapshot => {
      let userpost = snapshot.val();

      // Iteramos en la data y vamos creando los post

      for (let post in userpost) {
        /*         const btnUpdate = document.createElement('input');
        btnUpdate.setAttribute('id', 'Cod-' + newPost);
        btnUpdate.setAttribute('value', 'Editar');
        btnUpdate.setAttribute('type', 'button');

        const btnDelete = document.createElement('input');
        btnDelete.setAttribute('value', 'Eliminar');
        btnDelete.setAttribute('type', 'button');

        const contPost = document.createElement('div');
        const textPost = document.createElement('textarea'); */
      }
    });
};

window.onload = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      console.log('User is signed in.');

      var displayName = user.displayName;
      var userPhoto = user.photoURL;
      var emailU = user.email;

      userName.textContent = displayName;
      userImage = user.photoURL;
      //userImage.setAttribute()

      emailUser.textContent = emailU;
    } else {
      window.location.href = 'index.html';
      console.log('No esta logueado');
    }
  });
};

const createPost = () => {
  var myUserId = firebase.auth().currentUser.uid;
  const newPostKey = writeNewPost(myUserId, post.value, true);

  // Div que contendra mi post
  const contPost = document.createElement('div');
  const textPost = document.createElement('textarea');

  // Boton para actualizar el post
  const btnUpdate = document.createElement('input');
  btnUpdate.setAttribute('id', 'Cod-' + newPostKey);
  btnUpdate.setAttribute('value', 'Editar');
  btnUpdate.setAttribute('type', 'button');

  // Boton para borrar el post
  const btnDelete = document.createElement('input');
  btnDelete.setAttribute('value', 'Eliminar');
  btnDelete.setAttribute('type', 'button');

  const btnLike = document.createElement('input');
  const showLikes = document.createElement('p');
  btnLike.setAttribute('value', 'Like');
  btnLike.setAttribute('type', 'button');
  btnLike.setAttribute('data-like', '0');
  showLikes.setAttribute('id', 'clicks');

  //Llamando a al botón para que ejecute la función de botón like
  btnLike.addEventListener('click', e => {
    e.preventDefault;
    likePost(myUserId, newPostKey)
/*     var currentStatus = e.target.getAttribute('data-like'); //0
    if (currentStatus === '0') {
      e.target.nextElementSibling.innerHTML = `${1} Te gusta`;
      e.target.setAttribute('data-like', '1');
    } else {
      e.target.nextElementSibling.innerHTML = '';
      e.target.setAttribute('data-like', '0');
    } */
  });

  textPost.setAttribute('id', newPostKey);
  textPost.disabled = true;
  textPost.innerHTML = post.value;

  //Hacemos los append para encadenar los botones y los div
  contPost.appendChild(textPost);
  contPost.appendChild(btnUpdate);
  contPost.appendChild(btnDelete);
  contPost.appendChild(btnLike);
  contPost.appendChild(showLikes);
  posts.appendChild(contPost);

  btnUpdate.addEventListener('click', () => {
    textPost.disabled = !textPost.disabled;

    if (textPost.disabled) {
      btnUpdate.value = 'Editar';
    } else {
      btnUpdate.value = 'Guardar';
    }

    editPost(textPost.value, myUserId, newPostKey);
  });

  btnDelete.addEventListener('click', () => {
    //Ejecutamos la funcion para eliminar el post
    //Le pasamos el Id del usuario y el ID del post a eliminar
    deletePost(myUserId, newPostKey);
    // Con este while eliminamos el div del post eliminado.
    while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
  });
};

btnToPost.addEventListener('click', () => {
  createPost();
});

btnLogout.addEventListener('click', () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log('Cerro Sesión');
    })
    .catch(function(error) {
      console.log('Error al cerrar Sesión');
    });
});

function reload_page() {
  window.location.reload();
}
