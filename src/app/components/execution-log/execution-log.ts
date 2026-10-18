import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlgorithmManager } from '../../services/algorithm-manager';
import { toSignal } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

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
    timer(0, 100).pipe(map(() => new Date())),
    { initialValue: new Date() }
  );
}
