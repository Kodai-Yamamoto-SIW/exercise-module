# @kodai-yamamoto-siw/exercise

Docusaurus で演習課題と解答の折りたたみ表示を手早く組み込むための React コンポーネントです。高校生向け教材に合わせて、専門用語を避けたデザインとスタイルを採用しています。

## インストール方法

```bash
npm install @kodai-yamamoto-siw/exercise
```

ローカルで相対パスを使う場合は次のように指定できます。

```bash
npm install ../packages/exercise-module
```

## 使い方

MDX ファイルでコンポーネントをインポートし、問題文と解答を子要素として渡します。

```mdx
import Exercise, { Solution } from '@kodai-yamamoto-siw/exercise';

<Exercise title="ボックスの色を変えましょう">
課題の説明をここに書きます。

<Solution>
解答のヒントや完成例をここに記載します。
</Solution>
</Exercise>
```

`Solution` を省略すると解答ブロックは表示されません。`solutionTitle` を指定すれば見出しを変更できます。

```mdx
<Exercise title="ステップの確認" solutionTitle="ヒントを見る">
段階的な説明だけを表示することもできます。
</Exercise>
```

## スタイル

コンポーネントが初回表示時に必要なスタイルを自動で `<style>` タグとして追加します。Docusaurus を含む通常のブラウザー環境であれば追加設定は不要です。
