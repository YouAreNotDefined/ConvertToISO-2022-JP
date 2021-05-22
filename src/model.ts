import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";
import * as Jschardet from "jschardet";
import { readFileSync, writeFile } from "fs";
// import * as Iconv from "iconv-lite";
import * as Iconv from "iconv";

export class Model {
  private static editor: vscode.TextEditor;
  private static readonly iconv = new Iconv('UTF-8', 'ISO-2022-JP');

  constructor(editor: vscode.TextEditor) {
    Model.editor = editor;
  }

  private static get fileDoc() {
    return Model.editor?.document.getText();
  }

  private static get readFile() {
    return readFileSync(`${Model.editor?.document.uri.fsPath}`);
  }

  private static get unicodeArray() {
    const unicodeArray: number[] = [];
    for (let i = 0; i < Model.fileDoc.length; i++) {
      unicodeArray.push(Model.fileDoc.charCodeAt(i));
    }
    return unicodeArray;
  }

  get charCode() {
    return Jschardet.detect(Model.readFile).encoding;
  }

  encodeFile() {
    const Utf8Array = encoding.convert(Model.readFile, {
      to: 'UTF8',
      from: 'AUTO'
    });
    // const text = encoding.codeToString(Utf8Array);
    const text = Model.iconv.convert(Model.readFile);

    writeFile(`${Model.editor?.document.uri.fsPath}`, text, (err) => {
      if (err) vscode.window.showInformationMessage(`${err}`);
    })
  }
}
