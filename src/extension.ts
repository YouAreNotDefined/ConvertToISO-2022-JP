import * as vscode from 'vscode';

import { StatusBar } from './setStatusBar';
import { Model } from './model';

export function activate(context: vscode.ExtensionContext) {
	// const charCodes = ['UTF16', 'UTF16BE', 'UTF16LE', 'UTF8', 'EUCJP', 'SJIS'];
	StatusBar.init();

	let disposable = vscode.commands.registerCommand('encodeISO2022JP.command', () => {
		// const isAvailable = charCodes.some(charCode => model.charCode === charCode);
		const editor = vscode.window.activeTextEditor;
		const model = new Model(editor);
		StatusBar.encoding();
		model.encodeFile();
		StatusBar.notEncoding();
			// vscode.window.showInformationMessage('This character encoding is not available');
		// if (isAvailable) {
		// } else {
		// 	return;
		// }
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
