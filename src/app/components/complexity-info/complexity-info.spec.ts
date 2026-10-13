import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexityInfo } from './complexity-info';

describe('ComplexityInfo', () => {
  let component: ComplexityInfo;
  let fixture: ComponentFixture<ComplexityInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexityInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplexityInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
