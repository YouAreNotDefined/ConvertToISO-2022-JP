# ConvertToISO-2022-JP

文字コードがISO-2022-JPのファイルをUNICODEに変換します。修正や確認後にISO-2022-JPに戻すことも可能です。

A VSCode Extension that help you to convert ISO-2022-JP based on an active HTML file on your VScode window.
This can convert ISO-2022-JP into UNICODE and then return to ISO-2022-JP.

## 使い方

- vscodeで対象のファイルを開いてください。
- コマンドパレットを開きます。（"Ctrl + Shift + P" or "⌘ + Shift + P"）
- "Convert ISO-2022-JP"と検索し、クリックします。

## Usage

- Open an file on your VScode window and activate it.
- Bring up the Command Palette (Press "Ctrl + Shift + P" or "⌘ + Shift + P").
- Search for the "Convert ISO-2022-JP" on Command Palette and click it.

## ショートカット Shortcuts

右下のステータスバーの"Convert ISO-2022-JP"をクリックすることで変換することも可能です。

Click to Convert ISO-2022-JP into UNICODE or return to ISO-2022-JP from Statusbar to turn on.
![shortcuts](https://user-images.githubusercontent.com/61075280/119502540-fe14e300-bda4-11eb-8200-c955241a7cde.PNG)

例 For example:
![GIF_example](https://user-images.githubusercontent.com/61075280/119502339-cc9c1780-bda4-11eb-8722-a555aac1be74.gif)

## 設定 Configuration

文字コード変換時にそのまま保存するか、もしくは保存せずに変換のみ行うかを設定可能です。
デフォルトでは保存します。保存せずに変換のみ行いたい場合は以下のチェックを外して下さい。

It is possible to set whether to save the file as-is when converting character codes, or whether to only convert the file without saving.
The default is to save the file. If you only want to convert without saving, uncheck the following.

![capture](https://user-images.githubusercontent.com/61075280/140607619-ce5accc6-4ffe-4905-b1a1-7122f2d348e4.PNG)
