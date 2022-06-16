let chargeOri = []

function getCharge(){
  return axios.get('./data/chargeData.json')
    .then((res)=> chargeOri = res.data)
}
function getHeader(){
  return fetch('./components/header.html').then((res)=> res.text())
}
function getCopyRight(){
  return fetch('./components/copyRight.html').then((res)=> res.text())
}

console.log("%c內容純屬虛構", "color:red; font-size:40px");

getCharge();
window.onload = function(){
  const App = document.getElementById("app");
  const mainFooter = document.querySelector(".main-footer");
  const mainHeader = document.querySelector(".main-header");
  let setChargeBtn = document.querySelectorAll(".charge-btn");
  /*charge頁面使用*/
  const chargeList = document.querySelector('.charge-list');

  /*■■■■■■■■■■ 插 件 區 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
  /*<!-- Initialize Swiper --------------------------------->*/
  /*381-ratio-breakpoints*/
  /*https://github.com/nolimits4web/swiper/blob/master/demos/381-ratio-breakpoints.html*/
  var swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    init: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '442': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '992': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      // '@1.50': {
      //   slidesPerView: 4,
      //   spaceBetween: 50,
      // },
    }
  });

  /*<!-- wow.js ------------------------------------------->*/
  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  //滾回頁首
  function setScrollTopBtn(){
    let scrollBtn = document.createElement('div');
      scrollBtn.className = 'scroll-top';
      App.appendChild(scrollBtn);
      scrollBtn.addEventListener('click', backToTop)
  }
  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // sweetAlertBtn();
  function sweetAlertBtn(){
    let setExperBtn = document.querySelectorAll(".experience-btn");
    //監聽物件啟動 sweetAlert
    setExperBtn.forEach((btn)=>{
      btn.addEventListener('click', function(){
        // alert('敬請期待!')
        Swal.fire('敬請期待!');
      })
    })
  }
  /*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
  /*<!-- 載入共用組件 --------------------------------->*/


  /*-----charge資費表載入------------------------------*/
  //載入資費清單
  let chargeArr = chargeOri.map((obj)=> obj.charge )
  let chargeInit = '10000';
  
  //按鈕選取效果添加與移除
  function isActive(btn){
    if(!btn){ 
      let initBtn = Array.from(chargeList.childNodes).filter((e)=> e.dataset.charge === chargeInit)
      initBtn[0].classList.add('active');
      return;
    };
    chargeList.childNodes.forEach((el)=> el.classList.remove('active'));
    btn.classList.add('active');
  }
  //render清單
  function renderchargeList(){
    chargeList.innerHTML = chargeArr.map((el)=> `<li class="charge-level" data-charge="${el}"><span>${el}</span>位</li>`).join('');
    isActive();
  }
  //render資料
  function render(e){
    let getCharge = '';
    if( e.target === this) return;
    if(e.target.matches('li')){
      getCharge = e.target.dataset.charge;
      isActive(e.target);
    } 
    if(e.target.matches('span')){
      getCharge = e.target.parentNode.dataset.charge;
      isActive(e.target.parentNode);
    }
    rederChargeBox(getCharge);
  }
  function rederChargeBox(getCharge){
    let chargeBox = document.querySelector('.charge-box');
    let getChargeObj = chargeOri.filter((obj)=> obj.charge === getCharge );
    let basicCost = getChargeObj[0].project[0].cost;
    let norCost = getChargeObj[0].project[1].cost;

    chargeBox.innerHTML = `
        <div id="basicCharge" class="charge-card">
            <h4 class="card-title">基本版</h4>
            <div class="charge-detail">
                <p>提供中小企業最必要的功能<br>
                  完整建立分眾以達到精準的行銷自動化</p>
                <div class="count">
                    <div class="charge-choose">
                        <h5>訂閱用戶數
                            <div class="charge-item">
                                <span class="person">${getCharge}</span>
                                <span class="unit">位</span>
                            </div>
                        </h5>
                    </div>
                    <div class="charge-count">
                        <h5>試算每月的費用
                            <div class="charge-item">
                                <span class="num">${basicCost}</span>
                                <span class="unit">TWD</span>
                            </div>
                        </h5>
                    </div>
                </div>
            </div>
            <ul class="charge-serve">
                <li>支援 Messenger / Instagram 或 LINE 渠道</li>
                <li>10 個進階套件</li>
                <li>可設定 50 種分眾標籤</li>
                <li>客服人機轉接</li>
            </ul>
            <div class="btn-box">
                <a href="#" class="btn experience-btn">立即體驗</a>
            </div>
        </div>
        <div id="norCharge" class="charge-card">
            <h4 class="card-title">標準版</h4>
            <div class="charge-detail">
                <p>建立企業流量池，全通路數據整合與交換<br>
                    高可靠性服務</p>
                <div class="count">
                    <div class="charge-choose">
                        <h5>訂閱用戶數
                            <div class="charge-item">
                                <span class="person">${getCharge}</span>
                                <span class="unit">位</span>
                            </div>
                        </h5>
                    </div>
                    <div class="charge-count">
                        <h5>試算每月的費用
                            <div class="charge-item">
                                <span class="num">${norCost}</span>
                                <span class="unit">TWD</span>
                            </div>
                        </h5>
                    </div>
                </div>
            </div>
            <ul class="charge-serve">
                <li>支援 Messenger / Instagram 或 LINE 渠道</li>
                <li>20 個進階及行銷互動套件</li>
                <li>可設定 500 種分眾標籤</li>
                <li>客服人機轉接＋自動指派專員處理</li>
            </ul>
            <div class="btn-box">
                <a href="#" class="btn experience-btn">立即體驗</a>
            </div>
        </div>`
    
    //重新渲染btn資料
    sweetAlertBtn();
  }
  




  /*載入header、footer、btn 等共用組件-----------------------------*/
  //獲取組件內容
  Promise.all([getHeader(), getCopyRight()])
    .then(([header, copyRight])=>{
      mainHeader.innerHTML = header;
      mainFooter.innerHTML = copyRight;
    })
    .then((end)=>{
      //統一設定charge按鈕
      setChargeBtn = document.querySelectorAll(".charge-btn");
      setChargeBtn.forEach((btn)=>{
          btn.href = "charge.html";
      })
    })

  //如果有抓到 chargeList 存在才會觸發
  if(chargeList){
    
    //charge 頁面預設呈現
    rederChargeBox(chargeInit);
    renderchargeList();
    chargeList.addEventListener('click', render);
  }
  


  //推入scrollTop 按鈕
  setScrollTopBtn();

  //動態效果初始化
  wow.init();
  

  


}//onload的尾巴