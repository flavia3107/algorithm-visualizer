import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ALGORITHM_TREE } from '../../../configs/algorithm-tree';
import { AlgorithmManager } from '../../algorithm-manager';

@Component({
  selector: 'app-sidenav',
  imports: [KeyValuePipe],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private _algorithmManager = inject(AlgorithmManager);
  readonly algorithmConfig = ALGORITHM_TREE;

  public updateView(newView: string): void {
    this._algorithmManager.updateActiveAlgorithm(newView);
  }
}
