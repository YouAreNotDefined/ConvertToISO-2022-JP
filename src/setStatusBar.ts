import * as vscode from 'vscode';

export class StatusBar {
  private static _statusBarItem: vscode.StatusBarItem;

  private static get statusBarItem() {
    if (!StatusBar._statusBarItem) {
      StatusBar._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);
      this.statusBarItem.show();
    }
    return StatusBar._statusBarItem;
  }

  static init() {
    StatusBar.decoding();
    setTimeout(() => {
      StatusBar.notDecoding();
    }, 1000);
  }

  static decoding() {
    StatusBar.statusBarItem.text = 'Decoding...';
  }

  static notDecoding() {
    StatusBar.statusBarItem.text = 'Decode ISO-2022-JP';
  }
}
