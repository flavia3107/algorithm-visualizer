import { computed, Injectable, signal } from '@angular/core';
import { ALGORITHM_CONFIG } from '../../configs/algorithm-details';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmManager {
  private _activeAlgorithm = signal<string>('bubble_sort');
  public activeView = computed(() => ALGORITHM_CONFIG[this._activeAlgorithm()]);


  public updateActiveAlgorithm(currentAlgorthm: string) {
    this._activeAlgorithm.set(currentAlgorthm);
  }
}
