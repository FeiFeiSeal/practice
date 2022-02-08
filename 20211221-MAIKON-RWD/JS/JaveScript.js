//手機選單控制
let mainNav = document.getElementById("mainNav");

document.getElementById("mobileNavBtn").addEventListener("click",function(){
    mainNav.classList.add("open");
})
document.getElementById("mobileNavClose").addEventListener("click",function(){
    mainNav.classList.remove("open");
})

//header捲動陰影控制
header = document.querySelector(".main-header");
ServiceCard = document.querySelectorAll(".service-info");

//監聽頁面滾動
window.addEventListener("scroll", function(){
    scrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;

    //header移動添加陰影效果-------------------------
    headerTop = header.offsetTop;
    if(headerTop > 0){
        header.classList.add("move");
    } else {
        header.classList.remove("move");
    }

    //room-in效果-----------------------------------
        //滾動到某區前-->當使用者視窗底端=data-box頂端觸發
        //某區內的data-box用scale縮小放大-->CSS-animation+延遲
        //只需要執行一次-->加了class之後不要移除
    for(i=0; i< ServiceCard.length; i++){
        if(ServiceCard[i].offsetTop <= scrollBottom ){
            if(document.documentElement.scrollWidth > 768){
                ServiceCard[i].classList.add("room-in");
                ServiceCard[i].style.animationDelay = 0.5 + ([i]*0.08) +"s";
            }else{
                ServiceCard[i].classList.add("room-in");
            }
        }
    }
}) 
    //數字跳動效果------------------------------------
        //滾動到某區前，數字跳至指定數字
            //起始數字
            //結束數字
            //運行秒數--> 統一秒數
            //每次相加數字(個位、十位)
            //運行一次即可-->移除監聽
    
    let completedData = document.getElementById("completedData");
    let teamData = document.getElementById("teamData");
    let satisfiedData = document.getElementById("satisfiedData");
    let valueData = document.getElementById("valueData");

    window.addEventListener("scroll", completedNum);
    window.addEventListener("scroll", teamDataNum);
    window.addEventListener("scroll", satisfiedNum);
    window.addEventListener("scroll", valueNum);
    
    function completedNum(){
        scrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    
        if(completedData.offsetTop <= scrollBottom){
            let startNum = 0;
            let endNum = 1880;
            let timer = setInterval(function(){
                window.removeEventListener("scroll", completedNum);
                startNum+=94;
                completedData.innerText = startNum+"+";
                
                if(startNum >= endNum){
                    completedData.innerText = endNum+"+";
                    clearInterval(timer);
                }
            },100)
        }
    }
    function teamDataNum(){
        scrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    
        if(teamData.offsetTop <= scrollBottom){
            let startNum = 0;
            let endNum = 56;
            let timer = setInterval(function(){
                window.removeEventListener("scroll", teamDataNum);
                startNum+=4;
                teamData.innerText = startNum;
                
                if(startNum >= endNum){
                    teamData.innerText = endNum;
                    clearInterval(timer);
                }
            },100)
        }
    }
    function satisfiedNum(){
        scrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    
        if(satisfiedData.offsetTop <= scrollBottom){
            let startNum = 0;
            let endNum = 2000;
            let timer = setInterval(function(){
                window.removeEventListener("scroll", satisfiedNum);
                startNum+=88;
                satisfiedData.innerText = startNum+"+";
                
                if(startNum >= endNum){
                    satisfiedData.innerText = endNum+"+";
                    clearInterval(timer);
                }
            },90)
        }
    }
    function valueNum(){
        scrollBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    
        if(valueData.offsetTop <= scrollBottom){
            let startNum = 0;
            let endNum = 100;
            let timer = setInterval(function(){
                window.removeEventListener("scroll", valueNum);
                startNum+=6;
                valueData.innerText = startNum + "%";
                
                if(startNum >= endNum){
                    valueData.innerText = endNum + "%";
                    clearInterval(timer);
                }
            },100)
        }
    }


//檢查表單是否填寫，無則出現提示文字
    //當表單長度=0，或是空白時
    //推入span.alert文字
let nameEnter = document.getElementById("nameEnter");
let emailEnter = document.getElementById("emailEnter");
document.getElementById("formSubmit").addEventListener("click",function(){   
    if(nameEnter.value=" "){
        let alertText = document.createElement("span");
        alertText.className = "alert";
        alertText.textContent = "The field is required.";
        document.getElementById("nameBox").appendChild(alertText);
        formsAlert();
    }
    if(emailEnter.value=" "){
        let alertText = document.createElement("span");
        alertText.className = "alert";
        alertText.textContent = "The e-mail address entered is invalid.";
        document.getElementById("emailBox").appendChild(alertText);
        formsAlert();
    }
    function formsAlert(){
        let alertText = document.createElement("span");
        alertText.className = "alert";
        let textNode = document.createTextNode("One or more fields have an error. Please check and try again.");
        alertText.appendChild(textNode);
        document.getElementById("signForm").appendChild(alertText);
    }
})
let subscriptEnter = document.getElementById("subscriptEnter");
document.getElementById("subscriptBtn").addEventListener("click", function(){
if(subscriptEnter.value = " "){
    let alertText = document.createElement("span");
        alertText.className = "alert";
        alertText.textContent = "Please specify a valid e-mail";
        document.getElementById("subscriptBox").appendChild(alertText);
}

})


// console.log(window.screenTop, "screenTop"); //視窗到螢幕頂端的位置
// console.log(window.screen.height, "screen.height"); //螢幕顯示器的寬高
// console.log(window.screen.width, "screen.width");
// console.log(document.documentElement.scrollTop, "documentElement.scrollTop");//
// console.log(document.documentElement.scrollHeight, "documentElement.scrollHeight"); //整個頁面高度
// console.log(document.documentElement.offsetHeight  , "document.documentElement.offsetHeight  "); //可見頁面高度
// console.log(document.documentElement.clientHeight  , "document.documentElement.clientHeight  "); 
// console.log(document.querySelectorAll(".service-info")[0].offsetTop  , ".service-info[0].offsetTop"); 
// console.log(scrollBottom)

