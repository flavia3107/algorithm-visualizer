import { Component, inject } from '@angular/core';
import { COMPLEXITY_CONFIG } from '../../../configs/algorithm-config';
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
  readonly complexityItem = COMPLEXITY_CONFIG;
}
