import * as vscode from 'vscode';
import { convert, detect, Encoding } from "encoding-japanese";
import { StatusBar } from './setStatusBar';
import { TextDecoder, TextEncoder } from 'util';

export class Model {
  private content: string;
  error: string | null;

  constructor(private _editor: vscode.TextEditor) {
    this._editor = _editor;
    this.content = '';
    this.error = null;
  }

  async readFile() {
    try {
      const tmp = await vscode.workspace.fs.readFile(this.fileUri);
      this.content = this.convertToString(tmp);
    } catch {
      this.error = 'An error has occurred. Please wait a moment and try again.'
    }
  }

  private async writeFile(result: string) {
    const text = this.convertToUint8Array(result);
    await vscode.workspace.fs.writeFile(this.fileUri, text);
  }

  private async replaceFile(result: string) {
    const edit = new vscode.WorkspaceEdit();
    edit.replace(this.fileUri, this.range, result);
    await vscode.workspace.applyEdit(edit)
  }

  private get range() {
    const startPosition = new vscode.Position(0, 0);
    const endoPosition = new vscode.Position(this._editor.document.lineCount - 1, 10000);
    return new vscode.Range(startPosition, endoPosition);
  }

  private get charCode() {
    return detect(this.content).toString();
  }

  private get fileUri() {
    return vscode.Uri.file(this._editor.document.uri.fsPath);
  }

  private convertToString(Uint8Array: Uint8Array) {
    return new TextDecoder().decode(Uint8Array)
  }

  private convertToUint8Array(str: string) {
    return new TextEncoder().encode(str)
  }

  get shouldSave() {
    const config = vscode.workspace.getConfiguration('ConvertToISO-2022-JP');
    return config.get<Boolean>('saveSetting');
  }

  setText() {
    this.content = this._editor.document.getText(this.range);
  }

  isAvailable(charCode: Encoding) {
    return this.charCode === charCode ? true : false;
  }

  convertFile(to: Encoding = 'UNICODE') {
    StatusBar.encoding();
    const result = convert(this.content, {
      to,
      from: 'AUTO'
    });

    if (this.shouldSave) this.writeFile(result)
    else this.replaceFile(result)

    StatusBar.notEncoding();
  }
}
