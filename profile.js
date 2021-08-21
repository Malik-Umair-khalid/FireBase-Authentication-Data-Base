firebase.auth().onAuthStateChanged((user) => {
    if (user) {
       let avs = firebase.database().ref(`users/${user.uid}`)
        .once('value' , (userInfo) =>{
            let details = userInfo.val()
            let lagInBtn = document.getElementById("lagInBtn")
            lagInBtn.style.display = "none";
            document.getElementById("lagOutBtn").style.display = "block";
            document.getElementById("name").innerText = details.name
            document.getElementById("phone").innerText = details.contact
            document.getElementById("dob").innerText = details.dob
            document.getElementById("address").innerText = details.address
            document.getElementById("mail").innerText = details.email
            document.getElementById("profile").src = details.profileImage
            let infoDiv = document.getElementById("infoDiv")
            let loaderGif = document.getElementById("loader")
            infoDiv.style.display = "block"
            loaderGif.style.display = "none"

            let editname = document.getElementById("editname")
            let editcontact = document.getElementById("editcontact")
            let editdob = document.getElementById("editdob")
            let editgender = document.getElementsByName("editgender")
            let editaddress = document.getElementById("editaddress")
            let editemail = document.getElementById("editemail")

            
            editname.value = details.name;
            editcontact.value = details.contact;
            editdob.value = details.dob
            editaddress.value = details.address;
            editemail.disabled = true;
            editemail.value = details.email
      
        })
    } else {
        window.replace = "index.html"
    }
  });

  function logout(){
    firebase.auth().signOut()
    .then(() =>{
      lagInBtn.style.display = "block"
      document.getElementById("lagOutBtn").style.display = "none"
      console.log("log Out Hofiya")
      window.location = "index.html"
    })
  }
  
  

const editProfile = () =>{
  let userId = localStorage.getItem("uid")
  let editname = document.getElementById("editname")
  let editcontact = document.getElementById("editcontact")
  let editdob = document.getElementById("editdob")
  let editgender = document.getElementsByName("editgender")
  let editaddress = document.getElementById("editaddress")
  let editemail = document.getElementById("editemail")

      let name = document.getElementById("name")
      let contact = document.getElementById("phone")
      let dob = document.getElementById("dob")
      let gender = document.getElementsByName("gender")
      let address = document.getElementById("address")
      let email = document.getElementById("email")

  firebase.database().ref(`users/${userId}`).update(
    {
      name: editname.value,
      dob: editdob.value,
      contact: editcontact.value,
      address: editaddress.value
    }
  )
    name.innerHTML = editname.value;
    contact.innerHTML = editcontact.value;
    dob.innerHTML = editdob.value;
    name.innerHTML = editname.value;
    address.innerHTML = editaddress.value;
    let bandkaro = document.getElementById("bandkaro")
    bandkaro.click()
}

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


let editProfileImage = async () =>{
  let profilePic = document.getElementById("profilePic")
  console.log(profilePic)
  let image = await uploadImage(profilePic.files[0]);
  let userId = localStorage.getItem("uid")
  firebase.database().ref(`users/${userId}`).update({profileImage: image})
  document.getElementById("profile").src = image
  document.getElementById("celase").click() 
}