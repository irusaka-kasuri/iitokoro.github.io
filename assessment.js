'use strict';
const userNameInput    = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision   = document.getElementById('result-area');
const tweetDivision    = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
   () => { //無名関数でアロー関数
      const userName = userNameInput.value;
      if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
      }
          // 診断結果表示エリアの作成
    resultDivision.innerText = '';//divタグを空文字で上書きし、空にしている。連続しなくなる。
    const headerDivision = document.createElement('div');//h3タグの作成
    headerDivision.setAttribute('class','card-header text-bg-primary')
    headerDivision.innerText = '診断結果';//タグの内側のテキストを設定
    resultDivision.appendChild(headerDivision);//divタグの子要素として追加

    //bodyDivisionの作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class','card-body');//bootstrap用のクラス設定
    const paragraph = document.createElement('p');//pタグを作成
    paragraph.setAttribute('class','card-text');//class設定
    const result = assessment(userName);
    paragraph.innerText = result;//pタグの内側のテキストを設定
    bodyDivision.appendChild(paragraph);
    resultDivision.appendChild(paragraph);
    
    //resuleDivisionにもBootstrapのスタイルを適用する
    resultDivision.setAttribute('class','card');
    tweetDivision.innerText = ``;//divタグを空文字で上書き
    console.log(assessment(userName));//ログを出力して確認

    // X投稿ボタンの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);


    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);tweetDivision.appendChild(script);//divの子要素として追加
  }
)

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      // TODO Enter が押されたときに実行する処理
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
];

/** 
 * 名前の文字列を渡すと診断結果を返す関数
 *@param {string} userName ユーザの名前
 *@return {string}　診断結果
 */
function assessment(userName){
  // 全文字コード番号を取得して足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);  
  }
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('###userName###',userName);
  return result;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
      '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
      '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了');
}

test();
