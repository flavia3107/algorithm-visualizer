import { computed, Injectable, signal } from '@angular/core';
import { VisualizationStep, VisualizerStrategy } from '../../configs/algorithm-config';
import { ALGORITHM_CONFIG } from '../../configs/algorithm-details';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmManager {
  private _activeAlgorithm = signal<string>('bubble_sort');
  private _strategies = new Map<string, VisualizerStrategy>();
  private _timerId: ReturnType<typeof setTimeout> | null = null;

  public activeView = computed(() => ALGORITHM_CONFIG[this._activeAlgorithm()]);

  readonly currentDataSize = signal<number>(20);
  readonly speedMs = signal<number>(100);
  readonly steps = signal<VisualizationStep[]>([]);
  readonly currentStepIndex = signal<number>(0);
  readonly isPlaying = signal<boolean>(false);
  readonly activeStrategy = computed(() => this._strategies.get(this._activeAlgorithm()) ?? null);

  readonly currentStep = computed<VisualizationStep | null>(() => {
    const s = this.steps();
    const idx = this.currentStepIndex();
    return s.length > 0 && idx < s.length ? s[idx] : null;
  });

  readonly isCompleted = computed(() => {
    const s = this.steps();
    return s.length > 0 && this.currentStepIndex() === s.length - 1;
  });

  public updateActiveAlgorithm(currentAlgorthm: string) {
    this._activeAlgorithm.set(currentAlgorthm);
  }

  registerStrategy(key: string, strategy: VisualizerStrategy): void {
    this._strategies.set(key, strategy);
    if (this._activeAlgorithm() === key) this.resetData();
  }

  selectAlgorithm(algorithmKey: string): void {
    if (!this._strategies.has(algorithmKey)) return;
    this.pause();
    this._activeAlgorithm.set(algorithmKey);
    this.resetData();
  }

  resetData(): void {
    this.pause();
    const strategy = this.activeStrategy();
    if (!strategy) return;

    const initialData = strategy.generateInitialData(this.currentDataSize());
    const generatedSteps = strategy.buildSteps(initialData);

    this.steps.set(generatedSteps);
    this.currentStepIndex.set(0);
  }

  setSpeed(ms: number): void {
    this.speedMs.set(ms);
  }

  setDataSize(size: number): void {
    this.currentDataSize.set(size);
    this.resetData();
  }

  play(): void {
    if (this.isPlaying() || this.isCompleted()) return;
    this.isPlaying.set(true);
    this.scheduleNextFrame();
  }

  pause(): void {
    this.isPlaying.set(false);
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
  }

  togglePlay(): void {
    if (this.isPlaying()) this.pause();
    else this.play();
  }

  stepForward(): void {
    if (this.isPlaying()) this.pause();
    if (this.currentStepIndex() < this.steps().length - 1) this.currentStepIndex.update((idx) => idx + 1);
  }

  stepBackward(): void {
    if (this.isPlaying()) this.pause();
    if (this.currentStepIndex() > 0) this.currentStepIndex.update((idx) => idx - 1);
  }

  loadAndPlay(newSteps: VisualizationStep[]): void {
    this.pause();
    this.steps.set(newSteps);
    this.currentStepIndex.set(0);
    this.play();
  }

  private scheduleNextFrame(): void {
    if (!this.isPlaying()) return;

    this._timerId = setTimeout(() => {
      if (this.currentStepIndex() < this.steps().length - 1) {
        this.currentStepIndex.update((idx) => idx + 1);
        this.scheduleNextFrame();
      } else this.pause();
    }, this.speedMs());
  }
}
