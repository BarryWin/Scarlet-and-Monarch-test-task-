//swiper
import Swiper from '../libs/swiper/dist/js/swiper.min';
var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    simulateTouch: false,
    autoplay: {
        delay: 5000,
    },
});
//swiper autoplay disabled onmouseover
let slider = document.getElementById("slider");
    slider.addEventListener("mouseover", () => mySwiper.autoplay.stop());
    slider.addEventListener("mouseout", () => mySwiper.autoplay.start());


var swiper2 = new Swiper('.swiper-goods-container', {
    loop: true,
    slidesPerView: 'auto',
    breakpointsInverse: true,
    breakpoints: {
        // when window width is >= 1500px
        1500: {
            slidesPerView: 4,
            spaceBetween: 7
        },
        // when window width is >= 1100px
        1140: {
            slidesPerView: 3,
            spaceBetween: 7
        },
        // when window width is <= 320px
        880: {
            slidesPerView: 2,
            spaceBetween: 7
        },
    },
    spaceBetween: 7,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // loopFillGroupWithBlank: true,
    simulateTouch: false,
    autoplay: {
        delay: 5000,
    },
});
//swiper autoplay disabled onmouseover
let slider2 = document.getElementById("popular_goods");
    slider2.addEventListener("mouseover", () => swiper2.autoplay.stop());
    slider2.addEventListener("mouseout", () => swiper2.autoplay.start());
