import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmManager {
  public activeAlgorithm = signal<string>('bubble_sort');

  public updateActiveAlgorithm(currentAlgorthm: string) {
    this.activeAlgorithm.set(currentAlgorthm);
  }
}
