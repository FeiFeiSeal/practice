let userName = document.getElementById("userName");
let email = document.getElementById("email");
let pwd = document.getElementById("pwd");
let checkPwd = document.getElementById("checkPwd");
let form = document.querySelector("form");

function validateInput(){
  //驗證使用者名稱
  if(userName.value.trim()===""){
    onError(userName, "User name cannot be empty");
  }else{
    onSuccess(userName);
  }
  //驗證email
  //先判斷使用者有沒有好好輸入
  //有輸入，但沒有符合正規表達式規定的格式-->錯誤
  if(email.value.trim()===""){
    onError(email, "email cannot be empty");
  }else{
    if(!isValidEmail(email.value.trim())){
      onError(email, "email is not valid");
    }else{
      onSuccess(email);
    }
  }
  //驗證密碼
  if(pwd.value.trim()===""){
    onError(pwd, "password cannot be empty");
  }else{
    onSuccess(pwd);
  }
  //再次驗證密碼
  if(checkPwd.value.trim()===""){
    onError(checkPwd, "password cannot be empty");
  }else{
    if(checkPwd.value.trim()!==pwd.value.trim()){
      onError(checkPwd, "password & confirm password not matching");
    }else{
      onSuccess(checkPwd);
    }
  }
}

document.getElementById("registerBtn").addEventListener("click",(event)=>{
  event.preventDefault();
  validateInput();
})

function onSuccess(input){
  let parent = input.parentElement;
  let messageEle = parent.querySelector("span");
    messageEle.style.display = "none";
    messageEle.innerText = "";
    parent.classList.remove("error");
}
function onError(input, message){
  let parent = input.parentElement;
  let messageEle = parent.querySelector("span");
    messageEle.style.display = "block";
    messageEle.innerText = message;
    parent.classList.add("error");
}
function isValidEmail(email){
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}