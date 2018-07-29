//********ESTE DOCUMENTO MANIPULA AL profile.html********//

//VARIABLES
const btnLogout = document.getElementById('btnlogout')
const bd = document.getElementById('bd')
const btnToPost = document.getElementById('btnSave')
const post = document.getElementById('post')
const posts = document.getElementById('posts')
var userName = document.getElementById('user-name')
var userImage = document.getElementById('user-pic')
var emailUser = document.getElementById('emailUser')

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
      //userImage.setAttribute()

      emailUser.textContent = emailU;

    } else {
      window.location.href = "index.html"
      console.log('No esta logueado');

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
};
*/



btnToPost.addEventListener('click', () => {
  var userId = firebase.auth().currentUser.uid;
  const newPost = writeNewPost(userId, post.value);

  var btnUpdate = document.createElement("input");
  btnUpdate.setAttribute("id", 'Cod-' + newPost);
  btnUpdate.setAttribute("value", "Editar");
  btnUpdate.setAttribute("type", "button");
  var btnDelete = document.createElement("input");
  btnDelete.setAttribute("value", "Eliminar");
  btnDelete.setAttribute("type", "button");
  var contPost = document.createElement('div');
  var textPost = document.createElement("textarea")
  textPost.setAttribute("id", newPost);
  textPost.disabled = true;

  const btnLike = document.createElement("a");
  const showLikes = document.createElement('p');
  showLikes.setAttribute('id', 'clicks');
  textPost.innerHTML = post.value;
  btnLike.textContent = "Me gusta";
  btnLike.setAttribute('data-like', '0');




  btnUpdate.addEventListener('click', () => {

    textPost.disabled = false;
    //textPost.setAttribute('contenteditable',true);
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

    while (contPost.firstChild) contPost.removeChild(contPost.firstChild);


  })

  btnLike.addEventListener('click', (e) => {
    e.preventDefault;
    var currentStatus = e.target.getAttribute('data-like') //0
    if (currentStatus === '0') {
      e.target.nextElementSibling.innerHTML = `${1} Te gusta`
      e.target.setAttribute('data-like', '1')
    } else {
      e.target.nextElementSibling.innerHTML = ''
      e.target.setAttribute('data-like', '0')
    }
  })




  contPost.appendChild(textPost);
  contPost.appendChild(btnUpdate);
  contPost.appendChild(btnDelete);
  contPost.appendChild(btnLike);
  contPost.appendChild(showLikes);
  posts.appendChild(contPost);

})


btnLogout.addEventListener('click', () => {
  firebase.auth().signOut().then(function () {
    console.log('Cerro Sesión');
  }).catch(function (error) {
    console.log('Error al cerrar Sesión');
  });
})

function reload_page() {
  window.location.reload();
}
