import { Component, inject } from '@angular/core';
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
  readonly activeAlgorithmId = this._algorithmService.activeView;
  readonly activeGraph = this._algorithmTracer.graphState;
  readonly activeArrayData = this._algorithmTracer.arrayState;
}
