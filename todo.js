firebase.auth().onAuthStateChanged((user) => {
  if (user) {
   let login = document.getElementById("login")
   login.style.display = "none"
   document.getElementById("lagOutBtn").style.display = "block"
   document.getElementById("taskDiv").style.display = "block"
   document.getElementById("loader2").style.display = "none"    
  } else if (!user) {
    document.getElementById("loader").style.display = "none"
    window.location = "index.html"
  }
});


let uid = localStorage.getItem("uid")

function addTask(){
    let usertask = document.getElementById("usertask")
    if(usertask.value == ""){
      usertask.classList.add("Validiation")
      usertask.placeholder = "Please Fill This Field"
    }
    else{
    firebase.database().ref(`users/${uid}`).child("userTodos").push({todo: usertask.value})
    usertask.classList.remove("Validiation")
    }
  } 
  let taskList = document.getElementById("taskList")
  firebase.database().ref(`users/${uid}/userTodos`).on('child_added', (data) =>{
    console.log(data.val().todo)
    console.log(data.key)
    
    taskList.innerHTML += 
    `<li class=" border">
    <input value = "${data.val().todo}" type="text" id="task" class=" form-control mb-2" disabled>
    <button onclick="edit(this)" class=" btn btn-success" id = "${data.key}">EDIT</button>
    <button onclick="update(this , '${data.key}')" class=" btn btn-success nona" id = "${data.key}">Update</button>
    <button onclick="deleteBtn(this , '${data.key}')" id="${data.key}" class=" btn btn-danger float-end">DELETE</button>
    </li>`
  })


let deleteAll = () =>{
  firebase.database().ref(`users/${uid}/userTodos`).remove()
  taskList.innerHTML = ""
}

function deleteBtn(btn, key){
 btn.parentNode.remove()
firebase.database().ref(`users/${uid}/userTodos/${key}`).remove()
 }
  
  function edit(key) {

    let task = key.parentNode.firstElementChild;
    key.style.display = "none"
    let updateBtn = key.parentNode.firstElementChild.nextElementSibling.nextElementSibling;
    updateBtn.style.display = "inline"
    task.disabled = false;
    task.focus();
    task.value = ""

  }  

  function update(key, firkey) {
    let task = key.parentNode.firstElementChild;
    key.style.display = "none"
    let editBtn = key.parentNode.firstElementChild.nextElementSibling;
    editBtn.style.display = "inline"
    task.disabled = true;
    console.log(task.value)
    firebase.database().ref(`users/${uid}/userTodos/${firkey}`).update({todo: task.value})
  }

  function logout(){
    firebase.auth().signOut()
    .then(() =>{
      lagInBtn.style.display = "block"
      document.getElementById("lagOutBtn").style.display = "none"
      console.log("log Out Hofiya")
      window.location = "index.html"
    })
  }
  