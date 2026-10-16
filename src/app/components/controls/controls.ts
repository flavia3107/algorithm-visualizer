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

  public playOrStopAlgorithm() {
    this._manager.togglePlay();
  }

  public stepForward() {
    this._manager.stepForward();
  }

  public stepBackward() {
    this._manager.stepBackward();
  }
}
