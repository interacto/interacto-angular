import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwellSpringComponent } from './dwell-spring.component';

describe('DwellSpringComponent', () => {
  let component: DwellSpringComponent;
  let fixture: ComponentFixture<DwellSpringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DwellSpringComponent]
    });
    fixture = TestBed.createComponent(DwellSpringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
