window.onload = function(){

//手機選單的控制

    var menuBtn = document.getElementById("menuBtn");
    var nav = document.getElementById("nav");
    var headerLock = document.getElementById("headerLock");
    var headerUnlock = document.getElementById("headerUnlock");

    menuBtn.addEventListener("click",function(){
        menuBtn.classList.toggle("open");
        nav.classList.toggle("open");
        document.getElementById("top").classList.toggle("open");
        
        if(nav.classList.contains("open")){
            headerLock.style.color="#666";
            headerUnlock.style.color="#666";
            document.getElementById("newsArea").addEventListener("click",function(){
                menuBtn.classList.remove("open");
                nav.classList.remove("open");
                document.getElementById("top").classList.remove("open");
                headerLock.style.color="";
                headerUnlock.style.color="";
            })
        }else{
            headerLock.style.color="";
            headerUnlock.style.color="";
        }
    })
    
//手機選單是否固定在頁首+若選單開啟無法變更固定/解鎖狀態
headerLock.addEventListener("click",function(){
    if(!nav.classList.contains("open")){
        this.classList.remove("active");
        headerUnlock.classList.add("active");
        document.getElementById("top").style.position="relative";
    }
    //手機選單解除fix狀態後，捲動頁面nav消失
    window.addEventListener("scroll", function(){
        if(nav.classList.contains("open")){
            menuBtn.classList.remove("open");
            nav.classList.remove("open");
            document.getElementById("top").classList.remove("open");
            headerLock.style.color="";
            headerUnlock.style.color="";
        }
    })

    
    
    
    
})
headerUnlock.addEventListener("click",function(){
    if(!nav.classList.contains("open")){
        this.classList.remove("active");
        headerLock.classList.add("active");
        document.getElementById("top").style.position="sticky";
    }
})


// 手機裝置header搜尋按鈕控制
    if(window.innerWidth < 768 ){
        document.getElementById("openSearch").addEventListener("click",function(){
            document.getElementById("searchControl").classList.add("active");
        })
        document.getElementById("closeSearch").addEventListener("click", function(){
            document.getElementById("searchControl").classList.remove("active");
            document.getElementById("searchBar").value = "";
        }) 
    }

//header日期顯示    
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var weekName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var Today = new Date();
    var date = document.getElementById("date");
    
    date.innerHTML = weekName[Today.getDay()]+". "+monthName[Today.getMonth()]+" "+Today.getDate()+", "+Today.getFullYear();



//popular 選單控制
    var mt = document.getElementsByClassName("mobile-title");
    var pc = document.getElementsByClassName("popular-category");
    var cc = document.getElementsByClassName("category-control");

    function clearActive(){
        for(s=0;s< cc.length; s++){
            pc[s].classList.remove("active");
            cc[s].classList.remove("active");
        }
    }

    for(let u=0; u<cc.length; u++){
        //手機控制
        mt[u].addEventListener("click", function(){
                        
            if(cc[u].classList.contains("active")){
                cc[u].classList.remove("active");
                pc[u].classList.remove("active");
            }else{
                clearActive();
                cc[u].classList.add("active");
                pc[u].classList.add("active");
            }
        })
    } 
    

    

    for(let i=0;i< cc.length; i++){
        //手機以上控制
        pc[i].addEventListener("click", function(){
            clearActive();
            
            this.classList.add("active");
            cc[i].classList.add("active");
        } )
    }
    
    

}