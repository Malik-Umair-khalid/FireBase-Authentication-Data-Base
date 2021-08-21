
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let lagInBtn = document.getElementById("lagInBtn")
    lagInBtn.style.display = "none";
    let profile = document.getElementById("profile")
    profile.style.display = "block";
    let todos = document.getElementById("todos")
    todos.style.display = "block";
    document.getElementById("lagOutBtn").style.display = "block";
    let loaderGif = document.getElementById("loaderGif")
    loaderGif.style.display = "none"
    console.log(loader)
  } else if (!user) {
    let loaderGif = document.getElementById("loaderGif")
    loaderGif.style.display = "none"
  }
});
let uploadImage = (file) =>{
  return new Promise((resolve, reject) =>{  
  if(file){ 
    let bar = document.getElementById("bar")
  let storagref = firebase.storage().ref(`profileImage/${file.name}`)
   let uploading =  storagref.put(file)
    uploading.on('state_changed',
    (snapshot) => {
       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       bar.style.width = Math.round(progress.toFixed()) + "%";
       bar.innerHTML = Math.round(progress.toFixed()) + "%";
       if(bar.style.width == "100%"){
        bar.style.width = "0%"
        bar.innerHTML = ""
        swal("Good Job!", "Image Added Successfully!", "success");     
       }
       bar.innerHTML = Math.round(progress.toFixed()) + "%";
       switch (snapshot.state) {
           case firebase.storage.TaskState.PAUSED:
               console.log('Upload is paused');
               break;
           case firebase.storage.TaskState.RUNNING:
               console.log('Upload is running');
               break;
       }
   },
   (error) => {
       reject(error)
   },
   () => {
       uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
           resolve(downloadURL)
       });
   }
);

  }
  else{
    swal("Noop!", "Please Add The Image!", "warning");
  }
})
}

const signIn = async  () => {
  let name = document.getElementById("name")
  let contact = document.getElementById("contact")
  let dob = document.getElementById("dob")
  let gender = document.getElementsByName("gender")
  let address = document.getElementById("address")
  let email = document.getElementById("email")
  let profile = document.getElementById("profile")
  let passward = document.getElementById("passward")
  let regForName = /^[a-z ,.'-]+$/i
  let regForMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  let image = await uploadImage(profile.files[0])
  
  for (var i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      gender = gender[i].value
    }
             }
  let userInfo = {
    name: name.value,
    address: address.value,
    contact: contact.value,
    dob: dob.value,
    profileImage: image,
    gender,
    email: email.value
  }
  let signBtn = document.getElementById("signupBtn")
  let loader = document.getElementById("loader")
  signBtn.style.display = "none"
  loader.style.display = "block"

  if (!regForName.test(name.value)) {
    name.value = ""    
    name.classList.add("Validiation")
    name.classList.remove("myInput")
    name.placeholder = "The Name Is Not Valid"
    name.focus()
    signBtn.style.display = "block"
    loader.style.display = "none"
  }
  else if (contact.value == "") {
    contact.classList.add("Validiation")
    contact.classList.remove("myInput")
    contact.placeholder = "The Number Is Not Valid"
    contact.focus()
    signBtn.style.display = "block"
    loader.style.display = "none"
  }
  else if (dob.value == "") {
    dob.classList.add("Validiation")
    dob.classList.remove("myInput")
    dob.placeholder = "Please Fill This Field"
    dob.focus()
    signBtn.style.display = "block"
    loader.style.display = "none"
  }
  else if (address.value == "") {
    address.classList.add("Validiation")
    address.classList.remove("myInput")
    address.placeholder = "Please Fill This Field"
    address.focus()
    signBtn.style.display = "block"
    loader.style.display = "none"
  }
  else if (!regForMail.test(email.value)) {
    email.classList.add("Validiation")
    email.classList.remove("myInput")
    email.placeholder = "The Name Is Not Valid"
    email.focus()
    signBtn.style.display = "block"
    loader.style.display = "none"
  }
  else if (passward.value <= 6) {
    passward.classList.add("Validiation")
    passward.classList.remove("myInput")
    passward.placeholder = "The Passward Is Not Valid"
    passward.focus()

  }


  else {
    firebase.auth().createUserWithEmailAndPassword(email.value, passward.value)
      .then((res) => {
        firebase.database().ref(`users/`).child(res.user.uid).set(userInfo)
          .then(() => {
              var errorDiv = document.getElementById("errorDiv")
              errorDiv.style.color = 'green'
              localStorage.setItem("uid", res.user.uid)
              errorDiv.style.fontSize = "15px"
              errorDiv.innerText = "You Are Successfully Signed In"
              signBtn.style.display = "block"
              loader.style.display = "none"
            setTimeout(() => {
            window.location = "index.html"
          }, 500)
          })
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage)
        var errorDiv = document.getElementById("errorDiv")
        errorDiv.innerText = errorMessage
        signBtn.style.display = "block"
        loader.style.display = "none"
      });
  }
}

const login = () => {
  let signBtn = document.getElementById("signupBtn")
  let loader = document.getElementById("loader")
  let email = document.getElementById("email")
  let passward = document.getElementById("passward")
  let regForMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  signBtn.style.display = "none"
  loader.style.display = "block"
  let lagInBtn = document.getElementById("lagInBtn")
  if (!regForMail.test(email.value)) {
    email.classList.add("Validiation")
    email.classList.remove("myInput")
    email.placeholder = "The Name Is Not Valid"
    email.focus()
    signBtn.style.display = "block"
    loader.style.display = "none"
  }
  else if (passward.value <= 6) {
    passward.classList.add("Validiation")
    passward.classList.remove("myInput")
    passward.placeholder = "The Passward Is Not Valid"
    passward.focus()
    signBtn.style.display = "block"
    loader.style.display = "none"
  }
  else {
    firebase.auth().signInWithEmailAndPassword(email.value, passward.value)
      .then((res) => {
        var user = res.user;
        let navIcon = document.getElementById("navIcon")
        navIcon.click()
        var errorDiv = document.getElementById("errorDiv")
        errorDiv.style.color = 'green'
        errorDiv.innerText = "You Are Successfully Signed In"
        signBtn.style.display = "block"
        loader.style.display = "none"
        setTimeout(() => {
          document.getElementById("modelClose").click()
        }, 1000)
        localStorage.setItem("uid", user.uid)
          
      })
      .catch((error) => {
        let navIcon = document.getElementById("navIcon")
        navIcon.click()
        var errorMessage = error.message;
        var errorDiv = document.getElementById("errorDiv")
        errorDiv.innerText = errorMessage
        errorDiv.style.color = "red"
        console.log(errorMessage)
        signBtn.style.display = "block"
        loader.style.display = "none"
      });
  }
}

function logout(){
  firebase.auth().signOut()
  .then(() =>{
    localStorage.removeItem("uid")
    lagInBtn.style.display = "block"
    document.getElementById("lagOutBtn").style.display = "none"
    let todos = document.getElementById("todos")
    todos.style.display = "none";
    let profile = document.getElementById("profile")
    localStorage.removeItem("uid")
    profile.style.display = "none"
    let navIcon = document.getElementById("navIcon")
    navIcon.click()
  })
}





let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
      let uploading = storageRef.put(file)
      uploading.on('state_changed',
          (snapshot) => {
              switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED:
                      console.log('Upload is paused');
                      break;
                  case firebase.storage.TaskState.RUNNING:
                      console.log('Upload is running');
                      break;
              }
          },
          (error) => {
              reject(error)
          },
          () => {
              uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  resolve(downloadURL)
              });
          }
      );
  })
}