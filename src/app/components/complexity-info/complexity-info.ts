import { Component, inject } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-complexity-info',
  imports: [],
  templateUrl: './complexity-info.html',
  styleUrl: './complexity-info.scss',
})
export class ComplexityInfo {
  private _manager = inject(AlgorithmManager);
  readonly activeAlgorithm = this._manager.activeView;
}
