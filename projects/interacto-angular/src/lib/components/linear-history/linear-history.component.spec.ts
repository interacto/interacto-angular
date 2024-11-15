import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinearHistoryComponent} from './linear-history.component';
import {TestingInteractoModule} from '../../testing-interacto-angular.module';

describe('LinearHistoryComponent', () => {
  let component: LinearHistoryComponent;
  let fixture: ComponentFixture<LinearHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingInteractoModule, LinearHistoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
