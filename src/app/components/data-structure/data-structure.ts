import { Component, inject, input } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';
import { AlgorithmTracer } from '../../services/algorithm-tracer';

@Component({
  selector: 'app-data-structure',
  templateUrl: './data-structure.html',
  styleUrl: './data-structure.scss',
})
export class DataStructure {
  private _algorithmService = inject(AlgorithmManager);
  private _algorithmTracer = inject(AlgorithmTracer);
  readonly algorithmId = this._algorithmService.activeView;
  readonly graph = this._algorithmTracer.graphState;
  readonly arrayData = this._algorithmTracer.arrayState;

  getPanelTitle(): string {
    const id = this.algorithmId();
    // if (id === 'breadth_first_search') return 'Queue (FIFO)';
    // if (id === 'depth_first_search') return 'Stack (LIFO)';
    // if (id === 'dijkstra' || id === 'a_star') return 'Min-Priority Queue';
    return 'Array Elements & Index Pointers';
  }
}
