
/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
/*----------------插件----------------------------*/
// import Swiper JS @8.2.2
import Swiper ,{ Pagination, Autoplay } from 'swiper'; 
import 'swiper/swiper-bundle.css';
import './style/helper/swiperjs.css' /*自定義 swiper 樣式(381-ratio-breakpoints)*/ 

//wow.js v1.2.2
import WOW from 'wow.js'

//Animate.css v4.1.1
import 'animate.css';

/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
/*----------------自訂義樣式-----------------------*/
//除了套件以外的CSS樣式、Bootstraps自定義樣式
import "./style/all.scss";

/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
/*----------------導入共用組件---------------------*/
// import copyRight from "./components/copyRight.html";
// import header from "./components/header.html";
// import logo from './img/logo.png'

console.log("parcel 打包1234565");

window.onload = function(){
  // const mainFooter = document.querySelector(".main-footer");
  // const mainHeader = document.querySelector(".main-header");

  // // mainHeader.innerHTML = header; //從component header那邊的路徑轉譯會錯誤
  // mainHeader.innerHTML = 
  //   `<div class="container-sm d-flex justify-content-between align-items-center">
  //       <h1 class="main-logo">
  //         <a href="index.html"><img class="w-100" src="${logo}" alt="chatTalkAILogo"></a>
  //       </h1>
  //       <a href="charge.html" class="btn charge-btn">方案費用</a>
  //   </div>`
  // mainFooter.innerHTML = copyRight;

  /*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
  /*<!-- Initialize Swiper --------------------------------->*/
  /*381-ratio-breakpoints*/
  /*https://github.com/nolimits4web/swiper/blob/master/demos/381-ratio-breakpoints.html*/
  var swiper = new Swiper('.swiper', {
      modules: [ Pagination, Autoplay],
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


/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
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

  wow.init();

}//onload