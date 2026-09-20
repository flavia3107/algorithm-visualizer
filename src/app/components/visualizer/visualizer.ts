import { Component, computed, inject } from '@angular/core';
import { VisualizationStep } from '../../../configs/algorithm-config';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-visualizer',
  imports: [],
  templateUrl: './visualizer.html',
  styleUrl: './visualizer.scss',
})
export class Visualizer {
  readonly manager = inject(AlgorithmManager);

  readonly arrayData = computed<number[]>(() => {
    const step = this.manager.currentStep();
    if (!step) return [];
    if (Array.isArray(step.data)) return step.data;
    if (step.data && Array.isArray(step.data.list)) return step.data.list;
    return [];
  });

  readonly barWidth = computed(() => {
    const data = this.arrayData();
    return data.length > 0 ? 800 / data.length : 0;
  });

  readonly scaleFactor = computed(() => {
    const data = this.arrayData();
    if (data.length === 0) return 1;
    const maxVal = Math.max(...data, 1);
    return 280 / maxVal;
  });

  getBarColor(index: number, step: VisualizationStep): string {
    if (step.completedIndices?.includes(index)) return '#a6e3a1';
    if (step.highlightIndices?.includes(index)) return '#f38ba8';
    if (step.activeIndices?.includes(index)) return '#f9e2af';
    return '#89b4fa';
  }
}
