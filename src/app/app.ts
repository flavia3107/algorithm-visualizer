import { Component, signal } from '@angular/core';
import { Controls } from './components/controls/controls';
import { DataStructure } from './components/data-structure/data-structure';
import { Details } from './components/details/details';
import { ExecutionLog } from './components/execution-log/execution-log';
import { Sidenav } from './components/sidenav/sidenav';
import { Visualizer } from './components/visualizer/visualizer';

@Component({
  selector: 'app-root',
  imports: [Controls, DataStructure, Details, ExecutionLog, Sidenav, Visualizer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('algorithm-visualizer');
}
