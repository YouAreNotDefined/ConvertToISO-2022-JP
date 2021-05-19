import * as vscode from 'vscode';

import { StatusBar } from './setStatusBar';
import { Model } from './model';

export function activate(context: vscode.ExtensionContext) {
	StatusBar.init();

	let disposable = vscode.commands.registerCommand('encodeISO2022JP.command', () => {
		const editor = vscode.window.activeTextEditor;
		if (typeof editor === 'undefined') {
			vscode.window.showInformationMessage('No active window!');
			return;
		}
		const model = new Model(editor);
		if (model.charCode === 'ISO-2022-JP') {
			StatusBar.encoding();
			model.encodeFile();
			StatusBar.notEncoding();
		} else {
			vscode.window.showInformationMessage('Can only convert the ISO-2022-JP');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
