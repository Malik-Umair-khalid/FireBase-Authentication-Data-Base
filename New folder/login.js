function chek() {
    var loginName = document.getElementById("loginId")
    var loginPass = document.getElementById("LoginPassward")
    var errorDiv = document.getElementById("errorDiv")
    var regex = /^[^\s@]+@[^\s@]+$/gm
    var regForPass = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/gim
    if (!regex.test(loginName.value)) {
      loginName.focus();
      loginName.value = ""
      loginName.classList.add("validation")
      loginName.placeholder = "Not Valid Mail"
  }

  else if (!regForPass.test(loginPass.value)) {
    loginPass.focus();
    loginPass.value = ""
    loginPass.classList.add("validation")
    loginPass.placeholder = "Please Write the passward"
  }
  else{
    firebase.auth().signInWithEmailAndPassword(loginName.value, loginPass.value)
    .then((res) => {
      // Signed in
      var user = res.user;
      console.log(user)
      window.location.href = "userPage.html"
      // ...
    })
    .catch((error) => {
    //   var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      errorDiv.innerHTML = errorMessage
    });
  }
}














    // let arr = JSON.parse(localStorage.getItem("array"));
    //         loginPass = loginPass.value
    //         loginName = loginName.value
    // for (var i = 0; i < arr.length; i++) {
    //     if ((loginName == arr[i].userName || loginName == arr[i].userMail) && loginPass == arr[i].passward) {
    //         window.location.href = "userPage.html"
    //     }
    // }
