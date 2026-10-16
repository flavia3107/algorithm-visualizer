import { Component, inject } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  private _manager = inject(AlgorithmManager);
  readonly activeAlgorithm = this._manager.activeView;
}
