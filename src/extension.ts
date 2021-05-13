import * as vscode from 'vscode';

import { Model } from './model';

export function activate(context: vscode.ExtensionContext) {
	const model = new Model();
	let disposable = vscode.commands.registerCommand('decodeISO2022JP.command', () => {
		vscode.window.showInformationMessage('ConvertToISO-2022-JP!');
		if (model.cahrCode === 'UTF8') {
			model.decodeFile();
		} else {
			vscode.window.showInformationMessage('Not UTF-8');
			return;
		}
	});
	context.subscriptions.push(disposable);
}
export function deactivate() {}
