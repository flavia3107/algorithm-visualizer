import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-execution-log',
  imports: [DatePipe],
  templateUrl: './execution-log.html',
  styleUrl: './execution-log.scss',
})
export class ExecutionLog {
  private _manager = inject(AlgorithmManager);
  readonly steps = this._manager.steps;
  readonly currentStepIndex = this._manager.currentStepIndex;
  readonly elapsedMs = signal(0);
  readonly currentTime = computed(() => new Date(this.elapsedMs()));

  constructor() {
    effect((onCleanup) => {
      if (this._manager.currentStepIndex() === 0) this.elapsedMs.set(0);
      if (this._manager.isPlaying()) {
        const timerId = setInterval(() => this.elapsedMs.update(t => t + 50), 50);
        onCleanup(() => clearInterval(timerId));
      }
    });
  }
}
