window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('User is signed in.');
        login.classList.add("hiden");
        bd.classList.remove("hiden");
        posts.classList.remove("hiden");
        logout.classList.remove("hiden");
        user_name.innerHTML = `Bienvenida ${user.displayName}`;
      } else {
        
        console.log('No esta logueado');
        login.classList.remove("hiden");
        logout.classList.add("hiden");
        posts.classList.add("hiden");
        bd.classList.add("hiden")
      }
    });
  
  };


  function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }

  function writeNewPost(uid, body) {
    // A post entry.
    var postData = {
      uid: uid,
      body: body,
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  return newPostKey
  }
