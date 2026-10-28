import { Component, inject } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  private _manager = inject(AlgorithmManager);
  readonly activeAlgorithm = this._manager.activeView;
  readonly isPlaying = this._manager.isPlaying;
  public speedDelayMs = this._manager.speedMs;

  public playOrStopAlgorithm() {
    this._manager.togglePlay();
  }

  public stepForward() {
    this._manager.stepForward();
  }

  public stepBackward() {
    this._manager.stepBackward();
  }

  public skipToEnd() {
    this._manager.skipToEnd();
  }

  public resetSteps() {
    this._manager.resetSteps();
  }

  public setSpeed(value: string) {
    this._manager.setSpeed(+value);
  }
}
