import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, interval, NEVER, scan, startWith } from 'rxjs';


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
  readonly currentTime = toSignal(
    toObservable(this._manager.isPlaying).pipe(
      switchMap(running => running ? interval(50) : NEVER),
      scan((acc) => acc + 50, 0),
      startWith(0)
    ),
    { initialValue: 0 }
  );
}
