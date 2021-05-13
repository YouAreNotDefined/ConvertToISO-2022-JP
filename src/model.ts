import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";

import { StatusBar } from './setStatusBar';
import { TextEncoder } from 'util';

export class Model {
  isWatching: boolean;
  isIso2022JP: boolean;
  isUtf8: boolean;

  constructor() {
    this.isWatching = false;
    this.isIso2022JP = false;
    this.isUtf8 = false;
    StatusBar.init();
  }

  private static get fileDoc() {
    const editor = vscode.window.activeTextEditor;

    if (typeof editor === undefined) {
      vscode.window.showInformationMessage('No active window!');
      return;
    }

    return editor?.document.getText();
  }

  private static get docArray() {
    assertIsDefined(Model.fileDoc);
    const encoder = new TextEncoder();
    return encoder.encode(Model.fileDoc);
  }

  get cahrCode() {
    const cahrCode = encoding.detect(Model.docArray);
    return cahrCode;
  }

  decodeFile() {
    StatusBar.decoding();
    const text = encoding.convert(Model.docArray, 'JIS');
    StatusBar.notDecoding();
  }
}

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}
