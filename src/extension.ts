import * as vscode from 'vscode';

import { Model } from './model';

export function activate(context: vscode.ExtensionContext) {
	const model = new Model();
	const charCodes = ['UTF16', 'UTF16BE', 'UTF16LE', 'UTF8', 'EUCJP', 'SJIS'];

	let disposable = vscode.commands.registerCommand('encodeISO2022JP.command', () => {
		vscode.window.showInformationMessage(`${model.charCode}`);

		const isAvailable = charCodes.some(charCode => model.charCode === charCode);

		if (isAvailable) {
			model.encodeFile();
		} else {
			vscode.window.showInformationMessage('This character encoding is not available');
			return;
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
