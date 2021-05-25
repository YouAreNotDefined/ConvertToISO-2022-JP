import * as vscode from 'vscode';
import { convert, detect, codeToString, Encoding } from "encoding-japanese";
import { readFileSync, writeFileSync } from "fs";

import { StatusBar } from './setStatusBar';

export class Model {
  private static get readFile() {
    return readFileSync(this.fileUri!);
  }

  private static get charCode() {
    return detect(this.readFile).toString();
  }

  private static get fileUri() {
    return vscode.window.activeTextEditor?.document.uri.fsPath;
  }

  static isAvailable(charCode: Encoding) {
    return this.charCode === charCode ? true : false;
  }

  static convertFile(to: Encoding = 'UNICODE') {
    if (!this.fileUri) return;
    StatusBar.encoding();
    const charArray = convert(this.readFile, {
      to,
      from: 'AUTO'
    });
    const text = codeToString(charArray);

    writeFileSync(this.fileUri, text);
    StatusBar.notEncoding();
  }
}
