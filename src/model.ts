import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";

import { StatusBar } from './setStatusBar';
import { TextEncoder } from 'util';

export class Model {
  isWatching: boolean;
  isIso2022JP: boolean;
  static editor: vscode.TextEditor | undefined;

  constructor() {
    this.isWatching = false;
    this.isIso2022JP = false;
    Model.editor = vscode.window.activeTextEditor;
    StatusBar.init();
  }

  private static get fileDoc() {
    if (typeof Model.editor === undefined) {
      vscode.window.showInformationMessage('No active window!');
      return;
    }

    return Model.editor?.document.getText();
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

  encodeFile() {
    assertIsDefined(Model.fileDoc);
    assertIsDefined(Model.editor);
    StatusBar.encoding();

    const text = encoding.convert(Model.fileDoc, 'JIS');

    StatusBar.notEncoding();

    const startPos = new vscode.Position(0, 0);
    const endPos = new vscode.Position(Model.editor?.document.lineCount - 1, 10000);
    const curSelection = new vscode.Selection(startPos, endPos);
    const callback = function (editBuilder: vscode.TextEditorEdit): void {
      editBuilder.replace(curSelection,text);
    }

    Model.editor.edit(callback);
  }
}

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}