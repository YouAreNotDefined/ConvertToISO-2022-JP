import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('', () => {
		vscode.window.showInformationMessage('ConvertToISO-2022-JP!');
	});
	context.subscriptions.push(disposable);
}
export function deactivate() {}
