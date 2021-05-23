import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";
import { readFileSync, writeFile } from "fs";

export class Model {
  private static _uri: string;

  constructor(editor: vscode.TextEditor) {
    Model._uri = editor.document.uri.fsPath;
  }

  private static get readFile() {
    return readFileSync(`${Model._uri}`);
  }

  private static get unicodeArray() {
    const unicodeArray: number[] = [];
    for (let i = 0; i < Model.readFile.toString().length; i++) {
      unicodeArray.push(Model.readFile.toString().charCodeAt(i));
    }
    return unicodeArray;
  }

  get charCode() {
    return encoding.detect(Model.readFile).toString();
  }

  encodeFile() {
    const Utf8Array = encoding.convert(Model.readFile, {
      to: 'UTF8',
      from: 'AUTO'
    });
    const text = encoding.codeToString(Utf8Array);

    writeFile(`${Model._uri}`, text, (err) => {
      if (err) vscode.window.showInformationMessage(`${err}`);
    })
  }
}
