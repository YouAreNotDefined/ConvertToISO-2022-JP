import * as vscode from 'vscode';

import { Model } from './model';
import { StatusBar } from './setStatusBar';

export function activate(context: vscode.ExtensionContext) {
	StatusBar.init();

	let disposable = vscode.commands.registerCommand('convertISO2022JP.command', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) return;

		if (Model.isAvailable('JIS')) Model.convertFile();
		else if (Model.isAvailable('UTF8')) Model.convertFile('JIS');
		else vscode.window.showInformationMessage('This character code is disabled');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
