import * as vscode from 'vscode';

import { Model } from './model';
import { StatusBar } from './setStatusBar';

export function activate(context: vscode.ExtensionContext) {
  StatusBar.init();

  let disposable = vscode.commands.registerCommand('convertISO2022JP.command', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const model = new Model(editor);

    if (model.shouldSave) await model.readFile();
    else model.setText();

    if (model.error) {
      vscode.window.showInformationMessage(model.error);
      return;
    }

    if (model.isAvailable('JIS')) model.convertFile();
    else if (model.isAvailable('UNICODE')) model.convertFile('JIS');
    else vscode.window.showInformationMessage('This character code is disabled');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
