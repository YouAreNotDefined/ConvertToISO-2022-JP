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
    StatusBar.watching();
    setTimeout(function () {
      StatusBar.notWatching();
    }, 1000);
  }

  static watching() {
    StatusBar.statusBarItem.text = 'Watching...';
  }

  static notWatching() {
    StatusBar.statusBarItem.text = 'Watch ISO-2022-JP';
  }
}
