import { Component, inject, signal } from '@angular/core';
import { Controls } from './components/controls/controls';
import { DataStructure } from './components/data-structure/data-structure';
import { Details } from './components/details/details';
import { ExecutionLog } from './components/execution-log/execution-log';
import { Sidenav } from './components/sidenav/sidenav';
import { Visualizer } from './components/visualizer/visualizer';
import { AlgorithmManager } from './services/algorithm-manager';

@Component({
  selector: 'app-root',
  imports: [Controls, DataStructure, Details, ExecutionLog, Sidenav, Visualizer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private _algorithmManager = inject(AlgorithmManager);
  public activeView = this._algorithmManager.activeView;
  protected readonly title = signal('algorithm-visualizer');
}
