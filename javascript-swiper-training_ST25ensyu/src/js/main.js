// 厳格モードを有効にし、未宣言変数の使用などの記述ミスをエラーとして検知する
"use strict";

/*---------- GSAP 設定 ----------*/
gsap.registerPlugin(ScrollTrigger);
// アニメーション対象のDOM要素が存在しない場合に出るコンソール警告を無効化する
gsap.config({
  nullTargetWarn: false,
});

/*---------- ハンバーガーメニュー ----------*/
// 操作対象の要素（ハンバーガーボタン・ナビゲーション・body）を取得する
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_nav");
const body = document.querySelector(".js_body");

// ハンバーガーボタンをクリックしたときの開閉処理
hamburger.addEventListener("click", function () {
  // ボタン自体の状態（×印への変形など）を切り替える
  hamburger.classList.toggle("is-active");
  // ナビゲーションメニューの表示・非表示を切り替える
  navigation.classList.toggle("is-active");
  // bodyにクラスを付け外しする（背景スクロール固定などの制御用）
  body.classList.toggle("is-active");
});

/*---------- スライドイン ----------*/
// （旧記述・コメントアウト中）メインコピーとサブコピーを順番に左からスライドインさせるタイムライン
// gsap
//   .timeline()
//   .from(".js_sub-copy", {
//     duration: 0.6,
//     autoAlpha: 0,
//     x: -100,
//   })
//   .from(".js_copy", {
//     duration: 0.6,
//     autoAlpha: 0,
//     x: -100,
//   });

/*---------- オープニングアニメーション ----------*/

// 順番に再生するアニメーションのまとまり（タイムライン）を作成
gsap.timeline()
  // 1. オープニングテキストを下からフェードイン（opacityとvisibilityを同時制御）
  .from(".js_opening-txt", {
    duration: 1.2,
    autoAlpha: 0,
    y: 40,
  })
  // 2. オープニング画面全体をフェードアウトし、完了後にbodyの制御クラスを外す
  .to(".js_opening", {
    autoAlpha: 0,
    duration: 0.6,
    onComplete: function () {
      body.classList.remove("is-active");
    },
  })
  // 3. サブコピーを左（-100px）からフェードイン
  .from(".js_sub-copy", {
    duration: 0.6,
    autoAlpha: 0,
    x: -100,
  })
  // 4. メインコピーを続けて左（-100px）からフェードイン
  .from(".js_copy", {
    duration: 0.6,
    autoAlpha: 0,
    x: -100,
  });

/*---------- スライドイン単体 ----------*/

// 開始状態（from）と終了状態（to）を明示してアニメーションを設定
gsap.fromTo(
  ".js_service",
  {
    // 開始時：y値を予め下方向に200pxずらす
    y: 200,
    // 開始時：不透明度を0（非表示）にする
    autoAlpha: 0,
  },
  {
    // 終了時：y値を元の位置（0px）に戻す
    y: 0,
    // 終了時：不透明度を1（表示）にする
    autoAlpha: 1,
    // アニメーションの時間（秒）
    duration: 0.8,
    // 変化前から変化後までのアニメーションの振る舞い（加減速カーブ）
    ease: "Power4.inOut",
    // スクロール位置に連動して発火させる設定（ScrollTriggerプラグインが必要）
    scrollTrigger: {
      // アニメーションの発火を監視するトリガー要素
      trigger: ".js_service-trigger",
      // スクロール位置の基準（要素の上端が画面中央に来たら開始）
      start: "top center",
      // 発火するスクロール位置や終了位置を画面上にマーカー表示する（デバッグ用）
      // markers: true,
    },
    // 同じクラスがついた複数要素を時間差で順番にアニメーションする
    stagger: {
      // each: 前の要素が始まってから次の要素が始まるまでの間隔（秒）
      each: 0.2,
      // amount: 複数要素全体のアニメーション総時間（eachかamountのどちらかを指定する）
      // amount: 1,
      // アニメーションを開始する要素の基準位置（先頭から順）
      from: "start",
      // 各要素ごとのイージングを上書きしたい場合に指定
      // ease: "bounce"
    },
  }
);

/*---------- スライドイン 複数----------*/
// 横スライド対象の要素をすべて取得
const items = document.querySelectorAll(".js_h-slide");

// 要素ごとにインデックス番号（idx: 0, 1, 2...）を取得して個別にScrollTriggerを設定
items.forEach(function (item, idx) {
  gsap.from(item, {
    // 1番目（idx=0）は (0+1)%2=1 で "-100%"（左から）、2番目（idx=1）は (1+1)%2=0 で "100%"（右から）交互に配置
    x: (idx + 1) % 2 == 0 ? "100%" : "-100%",
    autoAlpha: 0,
    ease: "Power4.inOut",
    scrollTrigger: {
      // 各要素自身が画面中央に来たらアニメーション開始
      trigger: item,
      start: "top center",
      // 発火するスクロール位置や終了位置をマーカーする
      // markers: true,
    },
  });
});

// 別解答（三項演算子の代わりに if / else 文で条件分岐した書き方）
// const items = document.querySelectorAll(".js_h-slide");

// items.forEach(function (item, idx) {

//   gsap.from(item, {
//     // インデックス番号に+1して、2で割った時にあまりが0だったら100%（右）、でなければ-100%（左）に配置する
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
//       trigger: item,
//       start: "top center",
//        // 発火するスクロール位置や終了位置をマーカーする
//        // markers: true,
//     },
//   });
// });

/*---------- アコーディオンメニュー ----------*/
const faq = document.querySelectorAll(".js_faq"); // アコーディオン全体のHTML要素をすべて取得する

console.log(faq); // 取得した要素一覧をコンソールに出力して確認

faq.forEach(function (element) {
  // 各FAQアイテム内の回答エリアを取得
  const faqA = element.querySelector(".js_faq-a");

  // FAQアイテムがクリックされたときの開閉処理
  element.addEventListener("click", function () {
    if (element.classList.contains("is-active")) {
      // すでに開いている場合：アコーディオンを閉じるときの処理
      // アイコン・状態操作用のクラスを取り除く
      element.classList.toggle("is-active");
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // 閉じるアニメーションを実行
      closingAnim(faqA);
    } else {
      // 閉じている場合：アコーディオンを開くときの処理
      // アイコン・状態操作用のクラスを付与する
      element.classList.toggle("is-active");
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // 開くアニメーションを実行
      openingAnim(faqA);
    }
  });
});

// アコーディオンの回答エリアを閉じるアニメーション関数
const closingAnim = function (content) {
  gsap.to(content, {
    height: 0, // 高さを0にして折りたたむ
    opacity: 0, // 透明にする
    duration: 0.4,
    ease: "Power4.inOut",
  });
};

// アコーディオンの回答エリアを開くアニメーション関数
const openingAnim = function (content) {
  // 現在のブラウザウィンドウの幅を取得
  const windowWidth = window.innerWidth;

  // スマホ・タブレット向けの初期padding値を設定（上 右 下 左）
  let paddingValue = "16px 48px 16px 16px";

  // ウィンドウの幅が1080px以上（PC幅）の場合、paddingを全方向16pxに変更
  if (windowWidth >= 1080) {
    paddingValue = "16px";
  }

  gsap.fromTo(
    content,
    {
      height: 0, // 閉じた状態（高さ0）から開始
      opacity: 0,
    },
    {
      height: "auto", // コンテンツ量に応じた自然な高さまで展開
      opacity: 1,
      padding: paddingValue, // 画面幅に応じて決めたpadding値を適用
      duration: 0.4,
      ease: "Power4.inOut",
    }
  );
};

/*---------- カルーセルパネル ----------*/
// 実績・事例などを表示するSwiperカルーセルの初期化
const swiper = new Swiper(".js_case-swiper", {
  loop: true, // 最後のスライドの次が最初に戻る無限ループを有効化
  // ページネーション（ドットインジケーター）の設定
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // ドットをクリックして該当スライドへ移動可能にする
  },
  // 前後へ移動する矢印ボタンの設定
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20, // スライド同士の余白（20px）
  // 画面幅に応じたレスポンシブ設定
  breakpoints: {
    // 768px以上で2カラム表示
    768: {
      slidesPerView: 2,
    },
    // 1088px以上で3カラム表示にし、スワイプ操作を無効化
    1088: {
      slidesPerView: 3,
      clickable: false, // ※Swiperの公式オプションとしては主にpagination側で使われます
      allowTouchMove: false, // ドラッグ・タッチスワイプによる移動を禁止
    },
  },
});

/*---------- スライドショー ----------*/

// 背景やヒーローエリアなどで自動再生されるフェード式スライドショーの初期化
const slideshow = new Swiper(".js_slideshow", {
  speed: 1200, // スライド切り替わりのアニメーション時間（1.2秒）
  effect: "fade", // スライドではなくクロスフェードで切り替える
  loop: true, // 無限ループ
  // 自動再生の設定
  autoplay: {
    delay: 1600, // 次のスライドに切り替わるまでの待機時間（1.6秒）
    disableOnInteraction: false, // ユーザー操作後も自動再生を継続する
  },
});