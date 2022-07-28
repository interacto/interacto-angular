import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeHistoryComponent } from './tree-history.component';
import {InteractoModule, interactoTreeUndoProviders} from '../../interacto-angular.module';

describe('TreeHistoryComponent', () => {
  let component: TreeHistoryComponent;
  let fixture: ComponentFixture<TreeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeHistoryComponent ],
      imports: [InteractoModule],
      providers: [interactoTreeUndoProviders()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
