import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ALGORITHM_TREE } from '../../../configs/algorithm-tree';

@Component({
  selector: 'app-sidenav',
  imports: [KeyValuePipe],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  readonly algorithmConfig = ALGORITHM_TREE;
}
