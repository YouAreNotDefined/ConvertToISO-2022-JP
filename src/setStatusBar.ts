import * as vscode from 'vscode';

export class StatusBar {
  private static _statusBarItem: vscode.StatusBarItem;

  private static get statusBarItem() {
    if (!StatusBar._statusBarItem) {
      StatusBar._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);
      this.statusBarItem.color = '#ffffff';
      this.statusBarItem.show();
    }
    return StatusBar._statusBarItem;
  }

  static init() {
    this.statusBarItem.command = 'encodeISO2022JP.command';
    StatusBar.encoding();
    setTimeout(() => {
      StatusBar.notEncoding();
    }, 1000);
  }

  static encoding() {
    StatusBar.statusBarItem.text = 'Encoding...';
  }

  static notEncoding() {
    StatusBar.statusBarItem.text = 'Encode ISO-2022-JP';
  }

  static dispose() {
    StatusBar.statusBarItem.dispose();
  }
}
