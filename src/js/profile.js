//********ESTE DOCUMENTO MANIPULA AL profile.html********//

//VARIABLES
const btnLogout = document.getElementById('btnlogout');
const bd = document.getElementById('bd');
const btnToPost = document.getElementById('btnSave');
// Post es el texto que escribo
const post = document.getElementById('post');
// Posts es el ID donde pongo todos mis post
const posts = document.getElementById('posts');
var userName = document.getElementById('user-name');
var userImage = document.getElementById('user-pic');
var emailUser = document.getElementById('emailUser');

//User Id

let UserId;

//Función para mostrar posts
let loadPosts = () => {
  myUserId = firebase.auth().currentUser.uid;

  /* Obtenemos la data de todos los post dentro de la base de datos*/

  firebase
    .database()
    .ref('user-posts/' + myUserId)
    .once('value')
    .then(snapshot => {
      let userpost = snapshot.val();

      // Iteramos en la data y vamos creando los post

      for (let post in userpost) {
        //Cargamos el contenido de cada post
        body = userpost[post]['body'];
        idPost = post;

        createPost(body, idPost);
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
      UserId = user.uid;

      userName.textContent = displayName;
      userImage = user.photoURL;
      loadPosts();

      emailUser.textContent = emailU;
    } else {
      window.location.href = 'index.html';
      console.log('No esta logueado');
    }
  });

  
};

const createPost = (body, idPost) => {
  //Obtenemos el Id del usuario actual.
  var myUserId = firebase.auth().currentUser.uid;
  let postKey = idPost;

/*   Al no tener ID el post supongo que es un post nuevo
  Lo pasamos por la función "writeNewPost" para poder
  Crearle un ID y escribir sus datos */
  if (postKey === undefined) {
    postKey = writeNewPost(myUserId, post.value, false);
  }

  // Div que contendrá mi post
  const contPost = document.createElement('div');
  const textPost = document.createElement('textarea');

  // Botón para actualizar el post
  const btnUpdate = document.createElement('input');
  btnUpdate.setAttribute('id', 'Cod-' + postKey);
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
    likePost(myUserId, postKey);
         var currentStatus = e.target.getAttribute('data-like'); //0
    if (currentStatus === '0') {
      e.target.nextElementSibling.innerHTML = `${1} Te gusta`;
      e.target.setAttribute('data-like', '1');
    } else {
      e.target.nextElementSibling.innerHTML = '';
      e.target.setAttribute('data-like', '0');
    } 
  });

  textPost.setAttribute('id', postKey);
  textPost.disabled = true;
  textPost.innerHTML = body;

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

    editPost(textPost.value, myUserId, postKey);
  });

  btnDelete.addEventListener('click', () => {
    //Ejecutamos la funcion para eliminar el post
    //Le pasamos el Id del usuario y el ID del post a eliminar
    deletePost(myUserId, postKey);
    // Con este while eliminamos el div del post eliminado.
    while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
  });
};

btnToPost.addEventListener('click', () => {
  createPost(post.value);
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
