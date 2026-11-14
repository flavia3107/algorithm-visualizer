import { computed, inject, Injectable } from '@angular/core';
import { AlgorithmManager } from './algorithm-manager';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmTracer {
  private _algorithmService = inject(AlgorithmManager);
  public arrayState = computed(() => {
    const step = this._algorithmService.currentStep();
    if (!step) return { arr: [], active: [], highlight: [], completed: [] };

    return {
      arr: Array.isArray(step.data) ? step.data : (step.data?.list ?? []),
      active: step.activeIndices ?? [],
      highlight: step.highlightIndices ?? [],
      completed: step.completedIndices ?? []
    };
  });

  public graphState = computed(() => {
    const step = this._algorithmService.currentStep();
    if (!step || Array.isArray(step.data)) {
      return { queue: [], stack: [], priorityQueue: [] };
    }

    return {
      queue: step.data?.queue ?? [],
      stack: step.data?.stack ?? [],
      priorityQueue: step.data?.priorityQueue ?? []
    };
  });
}
