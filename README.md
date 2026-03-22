# ConjMaster2

## 🚀 はじめに

<!-- どういうプロジェクトなのかといった説明文 -->

---

## ✨ 特徴

* **高速な開発体験**: Viteによるホットリロードのサポート
* **効率的なIPC通信**: メインプロセスとレンダラープロセスの通信を簡素化する仕組み
* **プロダクションビルド**: `npm run build`で簡単に実行ファイルを作成できる
* **データベース操作**: メインプロセス上でデータベース操作ができる
* **画面遷移に対応**: 画面遷移ができるようにする

---

## 📦 依存関係/技術スタック

* **フロントエンド**: React, Vite
* **画面遷移**: React Router
* **バックエンド (メインプロセス)**: Electron
* **言語**: TypeScript
* **データベース**: better-sqlite3
* **スタイル**: CSS Modules
* **テスト環境**: vitest, React Testing Library

---

## ⚙️ 開発環境のセットアップ

### Step0. Node.jsのインストール

Node.jsをインストールしておいてください。

### Step1. プロジェクトのclone

```shell
git clone https://github.com/Yor-Jihons/ConjMaster2.git
```

### Step2. installコマンドでパッケージの再現

```shell
npm install
```

### Step3. electron-rebuildを動かす

このステップが無いと「electronのバージョンの違い」によって動かなくなるため、ビルドしておく。

```shell
npx electron-rebuild
```

### Step4. プロジェクト名等の変更

* `package.json`の`name`の値
* `package.json`の`version`の値
* `package.json`の`build.appId`の値 (*1)
* `index.html`の`title`タグの値
* `README.md.txt`のプロジェクト名

`*1`: 一般的には`com.github.your-github-username.your-app-name`のような名前としていることが多いようです。

---

## 🤝 貢献とライセンス

This is under the MIT license. See also [LICENSE](./LICENSE).

This project includes the [Yor-Jihons/electron.default.electron_vite](https://github.com/Yor-Jihons/electron.default.electron_vite). See also [NOTICE](./NOTICE.md).
