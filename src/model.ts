import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";
import * as Jschardet from "jschardet";
// import * as Iconv from "iconv";
import * as Iconv from "iconv-lite";

// import { TextEncoder } from 'util';

export class Model {
  isEncoding: boolean;
  isIso2022JP: boolean;
  static editor: vscode.TextEditor | undefined;


  constructor(editor: vscode.TextEditor | undefined) {
    this.isEncoding = false;
    this.isIso2022JP = false;
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
    const buf = new Buffer(Model.fileDoc, 'binary');
    // const docUtf8 = encoding.convert(Model.fileDoc, 'UTF8');
    const docUtf8 = Iconv.decode(buf, 'utf8');
      vscode.window.showInformationMessage(`${buf}`);
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

    let text = '';
    if (this.charCode === 'UTF-8') {
      text = encoding.convert(Model.fileDoc, {
        to: 'JIS',
        from: 'UTF8',
        type: 'string'
      });
    } else {
      const JISArray = encoding.convert(Model.unicodeArray, {
        to: 'UTF8',
        from: 'UNICODE'
      });
      text = encoding.codeToString(JISArray);
    }
    vscode.window.showInformationMessage(this.charCode);

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
