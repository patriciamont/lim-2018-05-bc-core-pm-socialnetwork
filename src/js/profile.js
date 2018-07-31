//********ESTE DOCUMENTO MANIPULA AL profile.html********//

//VARIABLES
const btnLogout = document.getElementById('btnlogout');
const bd = document.getElementById('bd');
const btnToPost = document.getElementById('btnSave');
const inputPrivacy = document.getElementById('inputPrivacy');
// Post es el texto que escribo
const post = document.getElementById('post');
// Posts es el ID donde pongo todos mis post
const posts = document.getElementById('posts');
var userName = document.getElementById('user-name');
var userImage = document.getElementById('user-pic');
var emailUser = document.getElementById('emailUser');

// Cargamos los post publicos de TODOS los usuarios (ultimos 50)
let loadPosts = () => {
  userdata = firebase.auth().currentUser.uid;

  //Cargamos todos los Post que cotengan el valor public como FALSO
  ref = firebase.database().ref('posts');
  ref
    .orderByChild('private')
    .equalTo(false)
    .once('value', snapshot => {
      let userpost = snapshot.val();

      for (let post in userpost) {
        //Cargamos el contenido de cada post
        body = userpost[post]['body'];
        uid = userpost[post]['uid'];
        console.log(userpost)
        name = userpost[post]['name']
        idPost = post;

        // Si el id del usuario no coincide con el UID del post
        // Ejecutamos la funcion createPost con el parametro FALSE
        if (userdata === uid) {
          createPost(body, idPost, name, true);
        } else {
          createPost(body, idPost, name, false);
        }
      }
    });
};

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      console.log('User is signed in.');

      var displayName = user.displayName;
      var userPhoto = user.photoURL;
      var emailU = user.email;

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

const createPost = (body, idPost, username, private) => {
  //Obtenemos el Id del usuario actual.
  let userdata = firebase.auth().currentUser;
  let postKey = idPost;
  //Obtenemos si se ha seleccionado publico o privado

  /*   Al no tener ID el post supongo que es un post nuevo
  Lo pasamos por la función "writeNewPost" para poder
  Crearle un ID y escribir sus datos */
  if (postKey === undefined) {
    postKey = writeNewPost(userdata.uid, post.value, userdata.displayName, inputPrivacy.selectedIndex);
  }

  // Div que contendrá mi post
  const maxiPost = document.createElement('div');
  maxiPost.className = '"container mt-10"'
  const cardPost = document.createElement('div');
  cardPost.className = 'card w-100'
  const contPost = document.createElement('div');
  contPost.className = 'card-body'
  //DIV para el nombre
  const divName = document.createElement('p')
  divName.className = 'card-title'
  const textPost = document.createElement('textarea');
  textPost.className = 'card-text'
  divName.setAttribute('id', 'postname')
  divName.innerHTML = username
  textPost.setAttribute('id', postKey);
  textPost.disabled = true;
  textPost.innerHTML = body;

  maxiPost.appendChild(cardPost);
  cardPost.appendChild(contPost);
  contPost.appendChild(divName);
  contPost.appendChild(textPost);

  // Nos aseguramos que el post sea nuestro si es asi
  // creamos los botoenes para editarlo y borrarlo
  if (private) {
    // Botón para actualizar el post
    const btnUpdate = document.createElement('input');
    btnUpdate.className = 'btn btn-primary'
    btnUpdate.setAttribute('id', 'Cod-' + postKey);
    btnUpdate.setAttribute('value', 'Editar');
    btnUpdate.setAttribute('type', 'button');
    contPost.appendChild(btnUpdate); // APPEND

    // Botón para borrar el post
    const btnDelete = document.createElement('input');
    btnDelete.className = 'btn btn-primary'
    btnDelete.setAttribute('value', 'Eliminar');
    btnDelete.setAttribute('type', 'button');
    contPost.appendChild(btnDelete); // APPEND

    //Como el post es nuestro, agregamos las funcionalidades
    // de borrar y editar.

    btnUpdate.addEventListener('click', () => {
      textPost.disabled = !textPost.disabled;

      if (textPost.disabled) {
        btnUpdate.value = 'Editar';
      } else {
        btnUpdate.value = 'Guardar';
      }

      editPost(textPost.value, userdata.uid, postKey);
    });

    btnDelete.addEventListener('click', () => {
      //Ejecutamos la funcion para eliminar el post
      //Le pasamos el Id del usuario y el ID del post a eliminar
      deletePost(userdata.uid, postKey);
      // Con este while eliminamos el div del post eliminado.
      while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
    });
  }

  const btnLike = document.createElement('input');
  btnLike.className = 'btn btn-primary'
  const showLikes = document.createElement('p');
  btnLike.setAttribute('value', 'Me inspira');
  btnLike.setAttribute('type', 'button');
  btnLike.setAttribute('data-like', '0');
  showLikes.setAttribute('id', 'clicks');
  contPost.appendChild(btnLike); // APPEND
  contPost.appendChild(showLikes); // APPEND

  //Llamando a al botón para que ejecute la función de botón like
  btnLike.addEventListener('click', e => {
    e.preventDefault;
    likePost(userdata.uid, postKey);
    var currentStatus = e.target.getAttribute('data-like'); //0
    if (currentStatus === '0') {
      e.target.nextElementSibling.innerHTML = `${1} Te inspira`;
      e.target.setAttribute('data-like', '1');
    } else {
      e.target.nextElementSibling.innerHTML = '';
      e.target.setAttribute('data-like', '0');
    }
  });

  //Hacemos los append para encadenar los botones y los div
  posts.appendChild(maxiPost);
};

//BOTON PARA CUANDO DAMOS PUBLICAR
btnToPost.addEventListener('click', () => {
  let userdata = firebase.auth().currentUser;
  createPost(post.value, undefined, userdata.displayName, true);
  reload_page()
});

btnLogout.addEventListener('click', () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log('Cerro Sesión');
    })
    .catch(function (error) {
      console.log('Error al cerrar Sesión');
    });
});

function reload_page() {
  window.location.reload();
}
