firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.database().ref(`users/${user.uid}`)
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
  