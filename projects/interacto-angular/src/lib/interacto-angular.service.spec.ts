import { TestBed } from '@angular/core/testing';

import { InteractoAngularService } from './interacto-angular.service';

describe('InteractoAngularService', () => {
  let service: InteractoAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractoAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
