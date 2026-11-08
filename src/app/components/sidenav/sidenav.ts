import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CATEGORY_TITLES } from '../../../configs/algorithm-config';
import { ALGORITHM_TREE } from '../../../configs/algorithm-tree';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-sidenav',
  imports: [KeyValuePipe],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private _algorithmManager = inject(AlgorithmManager);
  readonly algorithmConfig = ALGORITHM_TREE;
  readonly activeView = this._algorithmManager.activeView;
  readonly sectionTitle = CATEGORY_TITLES;

  public updateView(newView: string): void {
    this._algorithmManager.updateActiveAlgorithm(newView);
  }
}
