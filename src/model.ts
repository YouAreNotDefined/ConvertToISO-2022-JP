import * as vscode from 'vscode';
import * as encoding from "encoding-japanese";
import * as Jschardet from "jschardet";
// import * as Iconv from "iconv";
import * as Iconv from "iconv-lite";

// import { StatusBar } from './setStatusBar';
// import { TextEncoder } from 'util';

export class Model {
  isEncoding: boolean;
  isIso2022JP: boolean;
  static editor: vscode.TextEditor | undefined;


  constructor(editor: vscode.TextEditor | undefined) {
    this.isEncoding = false;
    this.isIso2022JP = false;
    Model.editor = editor;
    // StatusBar.init();
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
    return docUtf8;
  }

  get charCode() {
    assertIsDefined(Model.fileDoc);
    // const charCode = encoding.detect(Model.fileDoc);
    const charCode = Jschardet.detect(Model.fileDoc);
    // return charCode;
    return charCode.encoding;
  }

  encodeFile() {
    assertIsDefined(Model.fileDoc);
    assertIsDefined(Model.editor);
    // StatusBar.encoding();

    let text = '';
    if (this.charCode === 'UTF-8') {
      text = encoding.convert(Model.fileDoc, 'JIS');
    } else {
      text = encoding.convert(Model.convertToUTF8, 'JIS');
    }
    // const iconv = new Iconv(this.charCode, 'ISO-2022-JP');
    // const text = iconv.convert(Model.fileDoc).toString();
    vscode.window.showInformationMessage(text);
    // StatusBar.notEncoding();

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
