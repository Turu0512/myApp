## オリジナル簡易送迎表作成アプリ、送迎くんの概要

```
送迎表作成までに行う事（左上のボタンから、メニューを表示することができます）

１：利用者情報の登録
「利用者一覧」画面の「利用者登録」ボタンから登録画面へ行き、必要項目を入力して保存
　表示名：送迎表を作成する際に表示する名前（基本的に姓を登録）
（例）送迎　太郎　→ 表示名：送迎
　同じ姓の方がいる場合　→　送迎（太）

２：送迎車両の登録

３：ドライバーの登録
```

## 送迎表作成手順

メニューから「送迎表」をクリック、当日の送迎表が表示されます。

### 手順１

画面右側の「利用者一覧」から名前をドラッグし、追加したい送迎コースの車両名と「施設」との間の空白部分にドロップします。 ＊何らかの理由で送迎の必要のない方は「家族送迎」に追加してください。 ＊「休み」の欄に追加した方は、午後の「利用者一覧」から削除されるので注意してください。

### 手順２

「ドライバー」をクリックし、リストからドライバーを選択してください。 （ドライバー管理で作成したドライバーが表示されます）

### 手順３

「一時保存」または「保存」ボタンを押し、保存してください。 ＊一時保存と保存の違いは、機能「カレンダーを表示する」で説明しています。

### 手順４

「印刷」ボタンを押し、印刷してご活用ください。

# その他機能、ボタンの説明

## 利用者一覧

### 編集ボタン

編集ボタンを押すことで、一度登録した内容を変更することができます。 何らかの理由で送迎の必要が無くなった際には編集ページ下部の「中止」にチェックを入れることで、利用者一覧から外すことができます。

### 利用中止者一覧

編集ページで「中止」にチェックを入れた利用者の一覧が表示されます。利用者一覧へ戻したい際には、チェックを外して保存してください。
利用者情報を削除したい場合には、画面下部の「削除」ボタンを押してください。削除した内容を復元することはできませんので注意してください。

## 送迎表

### カレンダーを表示する

- 「カレンダーを表示する」ボタンを押すと、カレンダーが表示されます。送迎表作成の際に「保存」を選択した場合には「作成済み」と表示され、「一時保存」を選択した場合には、「作成中」と表示されます。

- 日付を選択することで、その日の送迎表を閲覧・編集することができます。

- 画面左上の「当日に戻る」ボタンを押すと、当日の送迎表へ戻ります。

### 過去データを呼び出す

- カレンダーが表示され、送迎表作成時に「保存」を選択していた場合、ドットが表示されます。

- ドットがついた日付を選択することで、その日のデータを反映させることができます。（データがない、選択した曜日と作成中の曜日が違う場合、反映させることはできません）

### 送迎表の施設横の「×」ボタン

送迎表から車を削除することができます。  
車両が必要なかった場合などに使用してください。（既にコースに利用者が追加されていた場合には削除できません。他のコースに移動させる、利用者一覧に戻すなどしてから押してください）

### 車両追加

二度車両を使いたい場合や、誤って車両を削除してしまった際に使います。一覧から車両を選択することで、新しく車両を追加することができます。

### 反転挿入ボタン

「迎え」に登録したコースを逆順にして、「送り」に登録することができます。登録後も編集可能です。

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
