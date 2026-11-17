"use strict";

/*---------- ハンバーガーメニュー ----------*/
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_nav");
const body = document.querySelector(".js_body");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  body.classList.toggle("is-active");
});


/*---------- オープニングアニメーション ＋ スライドインの統合 ----------*/
gsap.timeline()
  // 1. オープニングのテキストがふわっと上に出てくる
  .from(".js_opening-txt", {
    duration: 1.2,
    autoAlpha: 0,
    y: 40,
  })
  // 2. オープニングの画面全体が消える
  .to(".js_opening", {
    autoAlpha: 0,
    duration: 0.6,
  })
  // 3. 【スライドイン】オープニングが消えた後、サブコピーが左からスライドイン
  .from(".js_sub-copy", {
    duration: 0.6,
    autoAlpha: 0,
    x: -100,
  })
  // 4. 【スライドイン】続けてコピーが左からスライドイン
  .from(".js_copy", {
    duration: 0.6,
    autoAlpha: 0,
    x: -100,
  });


/*---------- GSAP 設定 ----------*/
// 存在しない要素を取得しようとするときに出るエラーを非表示にする
gsap.config({
  nullTargetWarn: false,
});