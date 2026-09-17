import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStructure } from './data-structure';

describe('DataStructure', () => {
  let component: DataStructure;
  let fixture: ComponentFixture<DataStructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataStructure],
    }).compileComponents();

    fixture = TestBed.createComponent(DataStructure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
