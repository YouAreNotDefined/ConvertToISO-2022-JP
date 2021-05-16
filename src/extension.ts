import * as vscode from 'vscode';

import { StatusBar } from './setStatusBar';
import { Model } from './model';

export function activate(context: vscode.ExtensionContext) {
	StatusBar.init();

	let disposable = vscode.commands.registerCommand('encodeISO2022JP.command', () => {
		const editor = vscode.window.activeTextEditor;
		const model = new Model(editor);
		StatusBar.encoding();
		model.encodeFile();
		StatusBar.notEncoding();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
