import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, untracked, ViewChild } from '@angular/core';
import { VisualizationStep } from '../../../configs/algorithm-config';
import { ALGORITHM_MAP, generateInitialDataFor } from '../../helpers/algorithm-logic';
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

  readonly barWidth = computed(() => this._barWidth());
  readonly scaleFactor = computed(() => this._scaleFactor());
  @ViewChild('gridCanvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  constructor() {
    effect(() => this._initiateAlg());
    effect(() => this._drawCanvas());
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

        if (node.isStart) ctx.fillStyle = '#00daff';
        else if (node.isTarget) ctx.fillStyle = '#00daff';
        else if (node.isPath) ctx.fillStyle = '#badde9';
        else if (node.isVisited) ctx.fillStyle = '#292828';
        else if (node.isWall) ctx.fillStyle = '#4b4b4c';
        else ctx.fillStyle = '#1a1a1a';

        ctx.fillRect(c * cellW, r * cellH, cellW - 1, cellH - 1);
      }
    }
  }

  private _barWidth() {
    const data = this.arrayData();
    return data.length > 0 ? 800 / data.length : 0;
  }

  private _scaleFactor() {
    const data = this.arrayData();
    return (data.length === 0) ? 1 : (270 / (Math.max(...data, 1)));
  }

  private _initiateAlg() {
    const activeKey = this.manager.activeView()?.id;
    const size = this.manager.currentDataSize();

    if (!activeKey) return;

    const algorithmFn = ALGORITHM_MAP[activeKey];

    if (algorithmFn) {
      const initialData = generateInitialDataFor(activeKey, size);
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
  }

  private _drawCanvas() {
    const category = this.manager.activeView()?.category;
    const step = this.manager.currentStep();

    if (category === 'graphs' && step && this.canvasRef) this.drawCanvasGrid(step.data);
  }
}


/**
 * TO DO:
 * 1. Code clean up
 * 2. Add grid logic to service
 */