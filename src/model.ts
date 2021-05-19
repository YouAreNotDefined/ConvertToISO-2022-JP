import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";
import * as Jschardet from "jschardet";
import * as Iconv from "iconv-lite";
import * as fs from "fs";

export class Model {
  private static editor: vscode.TextEditor;

  constructor(editor: vscode.TextEditor) {
    Model.editor = editor;
  }

  private static get fileDoc() {
    return Model.editor?.document.getText();
  }

  private static get convertToUTF8() {
    const buf = Buffer.from(Model.fileDoc, 'binary');
    const docUtf8 = Iconv.decode(buf, 'utf-8');
    return docUtf8;
  }

  private static get unicodeArray() {
    const unicodeArray: number[] = [];
    for (let i = 0; i < Model.fileDoc.length; i++) {
      unicodeArray.push(Model.fileDoc.charCodeAt(i));
    }
    return unicodeArray;
  }

  private static get readFile() {
    return fs.readFileSync(`${Model.editor?.document.uri.fsPath}`);
  }

  get charCode() {
    return Jschardet.detect(Model.fileDoc).encoding;
  }

  encodeFile() {
    const Utf8Array = encoding.convert(Model.unicodeArray, {
      to: 'UTF8',
      from: 'AUTO'
    });
    const text = encoding.codeToString(Utf8Array);

    vscode.window.showInformationMessage(`${Model.readFile}`)

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
