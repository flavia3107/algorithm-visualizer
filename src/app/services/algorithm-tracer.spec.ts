import { TestBed } from '@angular/core/testing';

import { AlgorithmTracer } from './algorithm-tracer';

describe('AlgorithmTracer', () => {
  let service: AlgorithmTracer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmTracer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
