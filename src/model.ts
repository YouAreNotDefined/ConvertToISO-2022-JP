import * as vscode from 'vscode';

import { StatusBar } from './setStatusBar';

export class Model {
  isWatching: boolean;

  constructor() {
    this.isWatching = false;
    StatusBar.init();
  }


}
