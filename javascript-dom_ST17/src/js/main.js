"use strict";

/*---------- ハンバーガーメニュー ----------*/
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_navigation");
const body = document.querySelector(".js_body");

//ハンバーガーをクリックしたら
hamburger.addEventListener("click", () => {
//それぞれに対してis-activeクラスをつけ外しする
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
	body.classList.toggle("is-active");
});

/*---------- スライドイン ----------*/
gsap
  .timeline()
  .from(".js_copy", {
		// 0.6秒かけて
    duration: 0.6,
		// 透明度0の状態
    autoAlpha: 0,
		// x軸方向に-100pxの位置
    x: -100,
  })
  .from(".js_sub-copy", {
    duration: 0.6,
    autoAlpha: 0,
    x: -100,
  });


/*---------- オープニングアニメーション ----------*/

gsap.timeline()
    .from(".js_opening-txt", {
			//1.2秒かけて
      duration: 1.2,
			//透明度0から
      autoAlpha: 0,
			//y軸40px下から
      y: 40,
    }).to(".js_opening", {
      autoAlpha: 0,
      duration: 0.6,
    })
		//以下は先ほどのワイプインと同じコード
    .from(".js_copy", {
      duration: 0.6,
      autoAlpha: 0,
      x: -100,
    })
    .from(".js_sub-copy", {
      duration: 0.6,
      autoAlpha: 0,
      x: -100,
    });