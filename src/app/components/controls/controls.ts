import { Component, inject } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-controls',
  imports: [],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  private _manager = inject(AlgorithmManager);
  readonly activeAlgorithm = this._manager.activeView;
}
