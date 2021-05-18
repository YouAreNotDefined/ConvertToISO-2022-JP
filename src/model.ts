import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";
import * as Jschardet from "jschardet";
import * as Iconv from "iconv-lite";

// import { TextEncoder } from 'util';

export class Model {
  private static editor: vscode.TextEditor | undefined;

  constructor(editor: vscode.TextEditor | undefined) {
    Model.editor = editor;
  }

  private static get fileDoc() {
    if (typeof Model.editor === undefined) {
      vscode.window.showInformationMessage('No active window!');
      return;
    }

    return Model.editor?.document.getText();
  }

  private static get convertToUTF8() {
    assertIsDefined(Model.fileDoc);
    const buf = Buffer.from(Model.fileDoc, 'binary');
    const docUtf8 = Iconv.decode(buf, 'utf-8');
    return docUtf8;
  }

  private static get unicodeArray() {
    assertIsDefined(Model.fileDoc);
    const unicodeArray: number[] = [];
    for (let i = 0; i < Model.fileDoc.length; i++) {
      unicodeArray.push(Model.fileDoc.charCodeAt(i));
    }
    return unicodeArray;
  }

  get charCode() {
    assertIsDefined(Model.fileDoc);
    const charCode = Jschardet.detect(Model.fileDoc);
    return charCode.encoding;
  }

  encodeFile() {
    assertIsDefined(Model.fileDoc);
    assertIsDefined(Model.editor);

    const JISArray = encoding.convert(Model.unicodeArray, {
      to: 'UTF8',
      from: 'AUTO'
    });
    const text = encoding.codeToString(JISArray);
    // vscode.window.showInformationMessage(Jschardet.detect(encoding.codeToString(JISArray)).encoding)

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
