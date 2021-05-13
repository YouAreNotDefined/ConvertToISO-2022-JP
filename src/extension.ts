import * as vscode from 'vscode';

import { Model } from './model';

export function activate(context: vscode.ExtensionContext) {
	let model = new Model();
	let disposable = vscode.commands.registerCommand('decodeISO2022JP.command', () => {
		vscode.window.showInformationMessage('ConvertToISO-2022-JP!');
		model.decodeFile();
	});
	context.subscriptions.push(disposable);
}
export function deactivate() {}
