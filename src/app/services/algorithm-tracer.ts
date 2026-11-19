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

  public graphDisplayNodes = computed(() => {
    const algoId = this._algorithmService.activeView().id;
    const graph = this.activeGraph();

    const frontierNodes: string[] =
      algoId === 'breadth_first_search'
        ? graph.queue
        : algoId === 'depth_first_search'
          ? graph.stack
          : graph.priorityQueue.map((item: { id: string; cost: number }) => item.id);

    if (graph.isDone) {
      return graph.selectedNodes;
    }

    return frontierNodes.length > 0 ? frontierNodes : graph.selectedNodes;
  });
}
