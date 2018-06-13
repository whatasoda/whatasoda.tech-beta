# whatasoda.tech-beta
whatasoda.techのベータ版です。大学の授業の課題として制作しました。
https://whatasoda.github.io/whatasoda.tech-beta/
```
npm run dev
```
or
```
npm run docs
```

もともとWordPress実装をすることを想定して制作する課題でしたが、途中でWP実装はoptionalになりました。
とはいえWP実装想定なので絶対に実装する必要のない機能まで実装していますが、

- WPの経験が無い
- TSの知見を深められる
- ストレスレスな開発環境を構築できる

以上の理由から実装を決断しました。実装した機能のoverviewは以下の通りです。

- TSで書いたdataをpugに反映させる(gulp-dataを使用)
  - TS2.9から使える`import()`を使用。
- ダミーの記事内容をmarkdownからHTMLに変換してdataに
  - marked, highlight.jsなどを使用。
  - (これを書いている最中にjsdomが必要ないことに気が付きました。試行錯誤の痕跡でございます……。)
