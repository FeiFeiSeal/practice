console.log("%c內容純屬虛構", "color:red; font-size:40px");

window.onload = function(){
  const App = document.getElementById("app");
  const mainFooter = document.querySelector(".main-footer");
  const mainHeader = document.querySelector(".main-header");
  let setChargeBtn = document.querySelectorAll(".charge-btn");
  const chargeList = document.querySelector('.charge-list'); /*資費清單，判斷 charge 頁面使用*/

  /*■■■■■■■■■■ 插 件 區 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
  /*<!-- Initialize Swiper --------------------------------->*/
  /*381-ratio-breakpoints
  https://github.com/nolimits4web/swiper/blob/master/demos/381-ratio-breakpoints.html*/
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
  
  /*<!-- 滾回頁首 ------------------------------------------>*/
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

  /*<!-- sweetAlertBtn設定--------------------------------->*/
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


  /*■■■■■■■■■ 載入共用組件■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
  /*-----打 header、footer 回來-----------------------------*/
    function getHeader(){
      return fetch('./components/header.html').then((res)=> res.text())
    }
    function getCopyRight(){
      return fetch('./components/copyRight.html').then((res)=> res.text())
    }

  /*-----charge 頁面載入資費表------------------------------*/
    //載入資費清單
    //順序 打資料回來 → render list → 透過點選 list 的項目 render 出資費表box
    async function renderchargeBlock(){
      let getChargeData = await axios.get('./data/chargeData.json')
      let ChargeData = getChargeData.data;
      let chargeListArr = ChargeData.map((obj)=> obj.charge );
      let chargeInit = '10000';

      //render清單
      //必須先接收到axios打回來的資料
      function renderchargeList(){
        chargeList.innerHTML = chargeListArr.map((el)=> `<li class="charge-level" data-charge="${el}"><span>${el}</span>位</li>`).join('');
        isActive();
      }

      //chargeList按鈕選取效果添加與移除
      //必須先讓chargeList render 出來
      function isActive(btn){
        //頁面剛render出來時預設呈現的方案按鈕要active
        //=> 傳入空值的話就去抓取dataset=預設值的按鈕
        if(!btn){ 
          let initBtn = Array.from(chargeList.childNodes).filter((e)=> e.dataset.charge === chargeInit)
          initBtn[0].classList.add('active');
          return;
        };
        chargeList.childNodes.forEach((el)=> el.classList.remove('active'));
        btn.classList.add('active');
      }
      //按按鈕傳送dataset， render出相應的資費box
      //因為按鈕內有span，delegate先判斷是誰觸發的
      function render(e){
        let getChargeDataSet = '';
        if( e.target === this) return;
        if(e.target.matches('li')){
          getChargeDataSet = e.target.dataset.charge;
          isActive(e.target);
        } 
        if(e.target.matches('span')){
          getChargeDataSet = e.target.parentNode.dataset.charge;
          isActive(e.target.parentNode);
        }
        rederChargeBox(getChargeDataSet);
      }
      //接收 reder 目標
      function rederChargeBox(getChargeDataSet){
        let chargeBox = document.querySelector('.charge-box');
            let  getChargeObj = ChargeData.filter((obj)=> obj.charge === getChargeDataSet )
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
                                        <span class="person">${getChargeDataSet}</span>
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
                                        <span class="person">${getChargeDataSet}</span>
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
        //重新渲染sweetalert
        sweetAlertBtn();
      }

      chargeList.addEventListener('click', render);
      renderchargeList();
      rederChargeBox(chargeInit, ChargeData)
    }
      


  /*載入header、footer、btn 等共用組件-----------------------------*/
  //獲取組件內容
  Promise.all([getHeader(), getCopyRight()])
    .then(([header, copyRight])=>{
      /*載入header、footer*/
      mainHeader.innerHTML = header;
      mainFooter.innerHTML = copyRight;
    })
    .then((end)=>{
      /*統一設定charge按鈕連結*/
      setChargeBtn = document.querySelectorAll(".charge-btn");
      setChargeBtn.forEach((btn)=>{
          btn.href = "charge.html";
      })
    
    /*如果有抓到 chargeList 這個元件才會render資費表出來*/
    if(chargeList){
      //charge 頁面預設呈現
      renderchargeBlock();
    }
  })

  /*推入scrollTop 按鈕*/
  setScrollTopBtn();

  /*動態效果初始化*/
  wow.init();
  

}//onload的尾巴