import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionLog } from './execution-log';

describe('ExecutionLog', () => {
  let component: ExecutionLog;
  let fixture: ComponentFixture<ExecutionLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionLog],
    }).compileComponents();

    fixture = TestBed.createComponent(ExecutionLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
