import { Component, inject } from '@angular/core';
import { PseudocodeFormatPipe } from '../../../pipes/pseudocode-format-pipe';
import { AlgorithmManager } from '../../services/algorithm-manager';

@Component({
  selector: 'app-details',
  imports: [PseudocodeFormatPipe],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  private _manager = inject(AlgorithmManager);
  readonly activeAlgorithm = this._manager.activeView;
}
