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
  