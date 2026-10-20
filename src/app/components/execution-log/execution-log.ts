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
  // Store the exact global elapsed time when each step index is first reached
  readonly stepTimestamps = signal<Record<number, number>>({});

  readonly globalTime = computed(() => new Date(this.elapsedMs()));

  constructor() {
    effect((onCleanup) => {
      // Reset timers when starting over from the beginning
      if (this._manager.currentStepIndex() === 0) {
        this.elapsedMs.set(0);
        this.stepTimestamps.set({ 0: 0 }); // Step 0 starts at 0ms
      }

      if (this._manager.isPlaying()) {
        const timerId = setInterval(() => {
          this.elapsedMs.update(t => t + 50);

          const currentIndex = this._manager.currentStepIndex();

          // Lock in the timestamp for this step if it hasn't been recorded yet
          this.stepTimestamps.update(timestamps => {
            if (timestamps[currentIndex] === undefined) {
              return { ...timestamps, [currentIndex]: this.elapsedMs() };
            }
            return timestamps;
          });
        }, 50);

        onCleanup(() => clearInterval(timerId));
      }
    });
  }

  // Helper method to turn a recorded millisecond into a Date for the template
  getStepTime(index: number): Date {
    const ms = this.stepTimestamps()[index] ?? 0;
    return new Date(ms);
  }
}
