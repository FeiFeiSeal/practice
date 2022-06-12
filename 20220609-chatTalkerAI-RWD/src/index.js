import axios from 'axios';


/*----------------插件----------------*/
// import Swiper JS @8.2.2
import Swiper ,{ Pagination, Autoplay } from 'swiper'; 
import 'swiper/swiper-bundle.css';
import './style/helper/swiperjs.css' /*自定義 swiper 樣式(381-ratio-breakpoints)*/ 

//wow.js v1.2.2
import WOW from 'wow.js'

//Animate.css v4.1.1
import 'animate.css';

/*----------------自訂義樣式----------------*/
//除了套件以外的CSS樣式、Bootstraps自定義樣式
import "./style/all.scss";


console.log("hello world!");

window.onload= function(){


    /*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
    /*<!-- Initialize Swiper -->*/
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
    /*<!-- wow.js -->*/
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