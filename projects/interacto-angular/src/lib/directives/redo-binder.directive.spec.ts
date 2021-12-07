import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BindingsContext, Redo, UndoHistory} from 'interacto';
import {TestingInteractoModule} from '../testing-interacto-angular.module';
import {By} from '@angular/platform-browser';
import {robot} from 'interacto-nono';
import {StubCmd5} from './fixture-directive.spec';
import {PartialRedoButtonBinder, RedoBinderDirective} from './redo-binder.directive';

let fixture: ComponentFixture<TestComponent>;
let b2: PartialRedoButtonBinder;
let ctx: BindingsContext;
let history: UndoHistory;
let fn: () => void;

@Component({
  template: `
    <button id="b1" ioRedo>1</button>
    <button id="b2" [ioRedo]="m2">2</button>`
})
class TestComponent {
  public widget?: HTMLButtonElement = undefined;

  public m2(binder: PartialRedoButtonBinder, widget: HTMLButtonElement): void {
    this.widget = widget;
    b2 = binder;
    binder
      .end(fn)
      .bind();
  }
}

describe('redo directive', () => {
  beforeEach(() => {
    fn = jasmine.createSpy();

    fixture = TestBed.configureTestingModule({
      imports: [TestingInteractoModule],
      declarations: [RedoBinderDirective, TestComponent]
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

  it('should produce a redo on a click on b1', () => {
    history.add(new StubCmd5());
    history.undo();
    const div = fixture.debugElement.query(By.css('#b1')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(Redo);
  });

  it('should produce a redo on a click on b2', () => {
    history.add(new StubCmd5());
    history.undo();
    const div = fixture.debugElement.query(By.css('#b2')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(Redo);
  });

  it('should call specific routines on a click on b2', () => {
    history.add(new StubCmd5());
    history.undo();
    const div = fixture.debugElement.query(By.css('#b2')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
