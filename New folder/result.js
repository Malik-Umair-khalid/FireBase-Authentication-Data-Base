let arr = JSON.parse(localStorage.getItem("array"));
for(var i = 0; i<arr.length; i++){
document.getElementById("a").innerHTML = "<span>User Name:</span> " + arr[i].name
document.getElementById("b").innerHTML= "<span>User Contact</span> " + arr[i].contactNo
document.getElementById("c").innerHTML = "<span>User Address:</span> " + arr[i].address
document.getElementById("e").innerHTML = "<span>User Mail:</span> " + arr[i].userMail
}