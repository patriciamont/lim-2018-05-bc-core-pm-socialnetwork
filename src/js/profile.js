//********ESTE DOCUMENTO MANIPULA AL profile.html********//

//VARIABLES
const btnLogout = document.getElementById('btnlogout');
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');
var userName = document.getElementById('user-name');
var userImage = document.getElementById('user-pic');
var emailUser = document.getElementById('emailUser');

//Esto lo voy a estar escribiendo mucho asi que mejor lo guardo en una variable
var database = firebase.database();

window.onload = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      console.log('User is signed in.');

      var displayName = user.displayName;
      var userPhoto = user.photoURL;
      var emailU = user.email;

      userName.textContent = displayName;
      userImage.style.backgroundImage;
      emailUser.textContent = emailU;
    } else {
      window.location.href = 'index.html';
      console.log('No esta logueado');
    }
  });
};

function writeNewPost(uid, body) {
  const userId = firebase.auth().currentUser.uid;

  //Escribimos en la base de datos pero esta vez los mensajes estaran separados
  // por el id del usuario, podemos guardar mas datos si es que quisieramos
  // por ejemplo a la hora que fue emitido el mensaje.
  let messageId = database.ref('posts/' + userId).push({
    mensaje: body,
    likes: 0
  }).key;

  var postData = {
    uid: uid,
    body: body
  };

  return messageId;
}

btnSave.addEventListener('click', () => {
  //Obtenemos el ID
  var userId = firebase.auth().currentUser.uid;

  /*
  Ejecutamos la funciona que nos permite crear un post
  Ella nos devuelve un ID unico con el cual identificaremos 
  el post en la base de datos */

  const post_id = writeNewPost(userId, post.value);

  var btnUpdate = document.createElement('input');

  btnUpdate.setAttribute('value', 'Editar');
  btnUpdate.setAttribute('type', 'button');

  /* Creamos un boton para eliminar el post */
  var btnDelete = document.createElement('input');

  /* Le damos algunos atributos al boton como el texto que tendra dentro
  y el tipo de boton que es */
  btnDelete.setAttribute('value', 'Eliminar');
  btnDelete.setAttribute('type', 'button');

  /* Creamos un div donde pondremos todo el contenido de nuestro post */
  var contPost = document.createElement('div');
  /* Creamos un div donde pondremos solo el texto del post */
  var textPost = document.createElement('p');

  /* Le damos el un ID (el mismo que obtuvimos al momento de crear el post)
    al DIV principal, esto nos va ayudar para mas adelante al momentro de eliminar
    tambien eliminar este DIV */
  contPost.setAttribute('id', post_id);

  const btnLike = document.createElement('a');
  const showLikes = document.createElement('p');

  showLikes.setAttribute('id', 'clicks');
  textPost.innerHTML = post.value;
  btnLike.textContent = 'Me gusta';
  btnLike.setAttribute('data-like', '0');

  btnUpdate.addEventListener('click', () => {
    textPost.setAttribute('contenteditable', true);
    const newUpdate = document.getElementById(post_id);
    const nuevoPost = {
      body: newUpdate.value
    };

    var updatesUser = {};
    var updatesPost = {};

    updatesUser['/user-posts/' + userId + '/' + post_id] = nuevoPost;
    updatesPost['/posts/' + post_id] = nuevoPost;

    firebase
      .database()
      .ref()
      .update(updatesUser);
    firebase
      .database()
      .ref()
      .update(updatesPost);
  });

  btnDelete.addEventListener('click', () => {
    database
      .ref()
      .child('posts/' + userId + '/' + post_id)
      .remove();

    //Eliminamos el post segun el id del post
    document.getElementById(post_id).remove();

    //Mensaje de Alerta cuando el usuario borra el post
    alert('El usuario borró post!');
  });

  btnLike.addEventListener('click', e => {
    e.preventDefault;

    var currentStatus = e.target.getAttribute('data-like'); //0
    if (currentStatus === '0') {
      e.target.nextElementSibling.innerHTML = `${1} Te gusta`;
      e.target.setAttribute('data-like', '1');
    } else {
      e.target.nextElementSibling.innerHTML = '';
      e.target.setAttribute('data-like', '0');
    }
  });

  contPost.appendChild(textPost);
  contPost.appendChild(btnUpdate);
  contPost.appendChild(btnDelete);
  contPost.appendChild(btnLike);
  contPost.appendChild(showLikes);
  posts.appendChild(contPost);
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
