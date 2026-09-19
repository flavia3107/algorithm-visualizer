import { TestBed } from '@angular/core/testing';

import { AlgorithmManager } from './algorithm-manager';

describe('AlgorithmManager', () => {
  let service: AlgorithmManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
