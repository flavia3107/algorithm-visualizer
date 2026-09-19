import { Component, computed, inject, signal } from '@angular/core';
import { ALGORITHM_CONFIG } from '../configs/algorithm-details';
import { AlgorithmManager } from './algorithm-manager';
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
  private _algorithmManager = inject(AlgorithmManager);
  public activeAlgorithm = this._algorithmManager.activeAlgorithm;
  public activeView = computed(() => ALGORITHM_CONFIG[this.activeAlgorithm()]);
  protected readonly title = signal('algorithm-visualizer');


}
