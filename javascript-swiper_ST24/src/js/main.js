"use strict";

/*---------- GSAP 設定 ----------*/

//存在しない要素を取得しようとするときに出るエラーを非表示にする
gsap.config({
  nullTargetWarn: false,
});

/*---------- ハンバーガーメニュー ----------*/
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_navigation");
const body = document.querySelector(".js_body");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  body.classList.toggle("is-active");
});

/*---------- スライドイン ----------*/
// gsap.timeline()
// 	.from('.js_copy', {
// 		duration: 0.6,
// 		autoAlpha: 0,
// 		x: -100,
// 	})
// 	.from('.js_sub-copy', {
// 		duration: 0.6,
// 		autoAlpha: 0,
// 		x: -100,
// 	});

/*---------- スライドイン（単体） ----------*/
gsap.from(".js_problem", {
  y: 200,
  autoAlpha: 0,
  duration: 1, //アニメーションの長さ
  ease: "Power4.inOut", //アニメーションの変化率
  scrollTrigger: {
    trigger: ".js_problem-trigger",
    start: "top center",
    // 発火するスクロール位置や終了位置をマーカーする
    // markers: true,
  },
  stagger: {
    // each: 指定した時間が経過した時に次の要素のアニメーションを開始する
    each: 0.6,
    // amount: アニメーションの総時間（eachかamountのどちらかを指定する）
    // amount: 1,
    from: "start",
    //start：1番目から始める
    // center： 中央から始める
    // edges： 両端から始める
    // random： ランダムに始める
    // end： 最後から始める
  },
});

/*---------- スライドイン（複数） ----------*/
const items = document.querySelectorAll(".js_h-slide");

// forEach文のコールバック関数
// 対象要素.forEach(function (value, index,array) {
// });
// value： 配列データの値
// index： 配列のインデックス番号→省略可能
// array： 現在処理している配列→省略可能

// 三項演算子の書き方
// "条件" ? "条件の内容がtrueになる場合の値" : "条件の内容がfalseになる場合の値";

items.forEach(function (item, idx) {
  gsap.from(item, {
    // インデックス番号に+1して、2で割った時にあまりが0だったら100%、でなければ-100%に配置する
    x: (idx + 1) % 2 == 0 ? "100%" : "-100%",
    autoAlpha: 0,
    ease: "Power4.inOut",
    scrollTrigger: {
      // item.parentNode: itemの親要素
      trigger: item.parentNode,
      start: "top center",
      // 発火するスクロール位置や終了位置をマーカーする
      // markers: true,
    },
  });
});

//別解答
// const items = document.querySelectorAll(".js_h-slide");

// items.forEach(function (item, idx) {

//   gsap.from(item, {
//     インデックス番号に+1して、2で割った時にあまりが0だったら100%、でなければ-100%に配置する
//     x: function () {
//       if ((idx + 1) % 2 == 0) {
//         return "100%";
//       } else {
//         return "-100%";
//       }
//     },
//     autoAlpha: 0,
//     ease: "Power4.inOut",
//     scrollTrigger: {
//       item.parentNode: itemの親要素
//       trigger: item.parentNode,
//       start: "top center",
//        発火するスクロール位置や終了位置をマーカーする
//        markers: true,
//     },
//   });
// });

/*---------- アコーディオンメニュー ----------*/
// ページ内にある「.js_faq」というクラスが付いた要素（FAQの1項目ずつ）をすべて取得する
const faq = document.querySelectorAll(".js_faq");

// 取得したFAQの要素を1つずつ順番に取り出して処理を設定する
faq.forEach(function(element) {
  // そのFAQ項目の中にある回答部分（.js_faq-a）を取得する
  const faqA = element.querySelector(".js_faq-a");

  // FAQ項目がクリックされたときの動きを設定する
  element.addEventListener("click", function() {
    // すでに開いている状態（is-activeクラスが付いているか）をチェックする
    if (element.classList.contains("is-active")) {
      // 【アコーディオンを閉じるときの処理】
      // 親要素の「is-active」クラスを外す（toggleで切り替え）
      element.classList.toggle("is-active");
      // 開閉アイコン（.js_faq_mark）の「is-open」クラスを外して元の向きに戻す
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // 回答部分を閉じるアニメーションを実行する
      closingAnim(faqA);
    } else {
      // 【アコーディオンを開くときの処理】
      // 親要素に「is-active」クラスを付ける
      element.classList.toggle("is-active");
      // 開閉アイコン（.js_faq_mark）に「is-open」クラスを付けて回転などをさせる
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // 回答部分を開くアニメーションを実行する
      openingAnim(faqA);
    }
  });
});

// 回答を「閉じる」ときのアニメーション設定（GSAPというライブラリを使用）
const closingAnim = function(content) {
  gsap.to(content, {
    height: 0,           // 高さを0にして見えなくする
    opacity: 0,          // 透明度を0（完全に透明）にする
    duration: 0.4,       // 0.4秒かけて変化させる
    ease: "Power4.inOut", // 最初と最後はゆっくり、途中は速く動く緩急をつける
  });
};

// 回答を「開く」ときのアニメーション設定（開始状態から終了状態を指定）
const openingAnim = function(content) {
  gsap.fromTo(
    content, {
      // 【開始時の状態】
      height: 0,         // 高さ0の状態からスタート
      opacity: 0,        // 透明な状態からスタート
    }, {
      // 【終了時の状態】
      height: "auto",    // 中身の文章量に合わせた自動の高さにする
      opacity: 1,        // 透明度を1（くっきり表示）にする
      duration: 0.4,     // 0.4秒かけて変化させる
      ease: "Power4.inOut", // 最初と最後はゆっくり、途中は速く動く緩急をつける
    }
  );
};
/*---------- カルーセルパネル ----------*/
// 「.js_success-swiper」クラスが付いた要素を対象に、スライダーライブラリ「Swiper」を初期化する
const swiper = new Swiper(".js_success-swiper", {
  // スライドを無限ループさせる（最後のスライドの次が最初に戻る）
  loop: true,

  // 画面下部などに表示されるドット（ページネーション）の設定
  pagination: {
    el: ".swiper-pagination", // ドットを表示する要素のセレクタ
    clickable: true,         // ドットをクリックして該当スライドへ移動できるようにする
  },

  // 「次へ」「前へ」矢印ボタンの設定
  navigation: {
    nextEl: ".swiper-button-next", // 「次へ」ボタンのセレクタ
    prevEl: ".swiper-button-prev", // 「前へ」ボタンのセレクタ
  },

  // スライド同士の余白（間隔）を20pxにする
  spaceBetween: 20,

  // 画面幅（ブレイクポイント）ごとの表示枚数の切り替え設定
  // ※初期状態（768px未満のスマホ表示など）は、デフォルトの「1枚表示」になる
  breakpoints: {
    // 画面幅が768px以上のとき
    768: {
      slidesPerView: 2, // スライドを2枚並べて表示する
    },
    // 画面幅が1088px以上のとき
    1088: {
      slidesPerView: 3, // スライドを3枚並べて表示する
    },
  },
});

/*---------- スライドショー ----------*/
// 「.js_slideshow」クラスが付いた要素を対象に、スライダーライブラリ「Swiper」を初期化する
const slideshow = new Swiper(".js_slideshow", {
  // スライドが切り替わるアニメーションの時間（1200ミリ秒 = 1.2秒）
  speed: 1200,

  // 切り替えエフェクトを「fade（フェードイン・フェードアウト）」にする
  // ※指定しない場合は横スクロール（slide）になる
  effect: "fade",

  // 自動再生の設定
  autoplay: {
    delay: 1600,                // 次のスライドに切り替わるまでの待機時間（1600ミリ秒 = 1.6秒）
    disableOnInteraction: false, // ユーザーが操作（スワイプやクリックなど）したあとも自動再生を継続する
  },
});
