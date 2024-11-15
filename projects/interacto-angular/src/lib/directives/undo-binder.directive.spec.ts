import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BindingsContext, Undo, UndoHistory} from 'interacto';
import {TestingInteractoModule} from '../testing-interacto-angular.module';
import {By} from '@angular/platform-browser';
import {robot} from 'interacto-nono';
import {StubCmd5} from './fixture-directive.spec';
import {PartialUndoButtonBinder, UndoBinderDirective} from './undo-binder.directive';

let fixture: ComponentFixture<TestComponent>;
let b2: PartialUndoButtonBinder;
let ctx: BindingsContext;
let history: UndoHistory;
let fn: () => void;

@Component({
  template: `
    <button id="b1" ioUndo>1</button>
    <button id="b2" [ioUndo]="m2">2</button>`,
  standalone: true,
  imports: [UndoBinderDirective]
})
class TestComponent {
  public widget?: HTMLButtonElement = undefined;

  public m2(binder: PartialUndoButtonBinder, widget: HTMLButtonElement): void {
    this.widget = widget;
    b2 = binder;
    binder
      .end(fn)
      .bind();
  }
}

describe('undo directive', () => {
  beforeEach(() => {
    fn = jasmine.createSpy();

    fixture = TestBed.configureTestingModule({
      imports: [TestingInteractoModule, UndoBinderDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    ctx = TestBed.inject(BindingsContext);
    history = TestBed.inject(UndoHistory);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('should create the bindings', () => {
    expect(ctx.bindings.length).toBe(2);
  });

  it('should call the binder method of b2', () => {
    expect(b2).toBeDefined();
  });

  it('should produce an undo on a click on b1', () => {
    history.add(new StubCmd5());
    const div = fixture.debugElement.query(By.css('#b1')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(Undo);
  });

  it('should produce an undo on a click on b2', () => {
    history.add(new StubCmd5());
    const div = fixture.debugElement.query(By.css('#b2')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(Undo);
  });

  it('should call specific routines on a click on b2', () => {
    history.add(new StubCmd5());
    const div = fixture.debugElement.query(By.css('#b2')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
