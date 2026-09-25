import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, untracked, ViewChild } from '@angular/core';
import { VisualizationStep } from '../../../configs/algorithm-config';
import { ALGORITHM_MAP } from '../../helpers/algorithm-logic';
import { GridNode } from '../../helpers/graph-algorithms';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-visualizer',
  imports: [NgTemplateOutlet],
  templateUrl: './visualizer.html',
  styleUrl: './visualizer.scss',
})
export class Visualizer {
  readonly manager = inject(AlgorithmManager);
  readonly arrayData = this.manager.logSteps;
  @ViewChild('gridCanvas') canvasRef?: ElementRef<HTMLCanvasElement>;



  readonly barWidth = computed(() => {
    const data = this.arrayData();
    return data.length > 0 ? 800 / data.length : 0;
  });

  readonly scaleFactor = computed(() => {
    const data = this.arrayData();
    if (data.length === 0) return 1;
    const maxVal = Math.max(...data, 1);
    return 270 / maxVal;
  });

  constructor() {
    effect(() => {
      const activeKey = this.manager.activeView()?.id;
      const size = this.manager.currentDataSize();

      if (!activeKey) return;

      const algorithmFn = ALGORITHM_MAP[activeKey];

      if (algorithmFn) {
        const initialData = this.manager.generateInitialDataFor(activeKey, size);
        const generatedSteps = algorithmFn(initialData);
        untracked(() => {
          this.manager.pause();
          this.manager.steps.set(generatedSteps);
          this.manager.currentStepIndex.set(0);

          queueMicrotask(() => {
            this.manager.play();
          });
        });
      }
    });

    effect(() => {
      const category = this.manager.activeView()?.category;
      const step = this.manager.currentStep();

      if (category === 'graphs' && step && this.canvasRef) {
        this.drawCanvasGrid(step.data);
      }
    });
  }



  getBarColor(index: number, step: VisualizationStep): string {
    if (step.completedIndices?.includes(index)) return '#a6e3a1';
    if (step.highlightIndices?.includes(index)) return '#f38ba8';
    if (step.activeIndices?.includes(index)) return '#f9e2af';
    return '#89b4fa';
  }

  private drawCanvasGrid(gridData: any[][]): void {
    if (!this.canvasRef || !gridData) return;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rows = gridData.length;
    const cols = gridData[0]?.length || 0;
    if (!rows || !cols) return;

    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const node = gridData[r][c];

        if (node.isStart) ctx.fillStyle = '#a6e3a1';
        else if (node.isTarget) ctx.fillStyle = '#f38ba8';
        else if (node.isPath) ctx.fillStyle = '#f9e2af';
        else if (node.isVisited) ctx.fillStyle = '#89b4fa44';
        else if (node.isWall) ctx.fillStyle = '#45475a';
        else ctx.fillStyle = '#1e1e2e';

        ctx.fillRect(c * cellW, r * cellH, cellW - 1, cellH - 1);
      }
    }
  }
}


/**
 * TO DO:
 * 1. Code clean up
 * 2. Add grid logic to service
 */