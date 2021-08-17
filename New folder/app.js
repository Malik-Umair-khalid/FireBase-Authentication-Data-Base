
function Submit() {
    var userMail = document.getElementById("userMail");
    var userPassward = document.getElementById("userPassward");
    var errorDiv = document.getElementById("errorDiv")
    var regForMail = /^[^\s@]+@[^\s@]+$/gm;
    var regForPass = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/gim
    if (!regForMail.test(userMail.value)) {
        userMail.focus();
        userMail.value = ""
        userMail.classList.add("validation")
        userMail.placeholder = "Should Be Like xyx@gmail.com"
        return false;
    }

    else if (!regForPass.test(userPassward.value)) {
        userPassward.focus();
        userPassward.value = ""
        userPassward.classList.add("validation")
        userPassward.placeholder = "Please Chose A Passward"
        return false;
    }

    else {
        userMail.classList.remove("validation")
        userPassward.classList.remove("validation")
        if (localStorage.getItem("array") === null) {
            let arrofobjs = [];
            localStorage.setItem("array", JSON.stringify(arrofobjs))
        }

        var userInfo = {
            userMail: userMail.value,
            passward: userPassward.value,
        }
        let arr = JSON.parse(localStorage.getItem("array"));
        arr.push(userInfo)
        localStorage.setItem("array", JSON.stringify(arr))


        firebase.auth().createUserWithEmailAndPassword(userMail.value, userPassward.value)
            .then((res) => {
                var user = res.user;
                console.log("user =", user)
                window.location.href = "login.html"
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log("erroe =", errorMessage)
                errorDiv.innerHTML = errorMessage
            });

    }
}
