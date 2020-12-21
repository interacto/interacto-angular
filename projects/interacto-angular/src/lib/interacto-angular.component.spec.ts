import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractoAngularComponent } from './interacto-angular.component';

describe('InteractoAngularComponent', () => {
  let component: InteractoAngularComponent;
  let fixture: ComponentFixture<InteractoAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractoAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractoAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
