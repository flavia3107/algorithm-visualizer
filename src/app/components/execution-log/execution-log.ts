import { DatePipe } from '@angular/common';
import { Component, computed, effect, EffectCleanupFn, inject, signal } from '@angular/core';
import { CustomTimestampPipe } from '../../../shared/pipes/custom-timestamp-pipe';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-execution-log',
  imports: [DatePipe, CustomTimestampPipe],
  templateUrl: './execution-log.html',
  styleUrl: './execution-log.scss',
})
export class ExecutionLog {
  private _manager = inject(AlgorithmManager);
  readonly steps = this._manager.steps;
  readonly currentStepIndex = this._manager.currentStepIndex;
  readonly elapsedMs = signal(0);
  readonly stepTimestamps = signal<Record<number, number>>({});
  readonly globalTime = computed(() => new Date(this.elapsedMs()));

  constructor() {
    effect((onCleanup) => this._timerCalculation(onCleanup));
  }

  private _timerCalculation(onCleanup: { (cleanupFn: EffectCleanupFn): void; (arg0: () => void): void; }) {
    if (this._manager.currentStepIndex() === 0) {
      this.elapsedMs.set(0);
      this.stepTimestamps.set({ 0: 0 });
    }

    if (this._manager.isPlaying()) {
      const timerId = setInterval(() => {
        this.elapsedMs.update(t => t + 50);
        const currentIndex = this._manager.currentStepIndex();
        this.stepTimestamps.update(timestamps => (timestamps[currentIndex] === undefined) ? { ...timestamps, [currentIndex]: this.elapsedMs() } : timestamps);
      }, 50);
      onCleanup(() => clearInterval(timerId));
    }
  }
}
