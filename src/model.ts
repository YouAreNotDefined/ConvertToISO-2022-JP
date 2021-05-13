import * as vscode from 'vscode';

import { StatusBar } from './setStatusBar';

export class Model {
  isWatching: boolean;
  isIso2022JP: boolean;

  constructor() {
    this.isWatching = false;
    this.isIso2022JP = false;
    StatusBar.init();
  }

  decodeFile() {

  }
}
