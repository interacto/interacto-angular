import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BindingsContext, PartialPointBinder} from 'interacto';
import {TestingInteractoModule} from '../testing-interacto-angular.module';
import {StubCmd1, StubCmd2, StubCmd3} from './fixture-directive.spec';
import {robot} from 'interacto-nono';
import {MouseenterBinderDirective} from './mouseenter-binder.directive';
import {OnDynamicDirective} from './on-dynamic.directive';

let fixture: ComponentFixture<TestComponent>;
let binderDiv: PartialPointBinder;
let binderBut: PartialPointBinder;
let binderB: PartialPointBinder;
let binderB2: PartialPointBinder;
let ctx: BindingsContext;

@Component({
  template: `
    <div [ioMouseenter]="methodDiv">1</div>
    <button [ioMouseenter]="methodBut">2</button>
    <div id="b" ioOnDynamic [ioMouseenter]="methodDyn"><b id="b1">B</b></div>
    <b id="b2" [ioMouseenter] (mouseenterBinder)="methodParam($event, 'bar')"></b>`
})
class TestComponent {
  public param: string = "";
  public widget?: HTMLButtonElement = undefined;

  public methodDiv(binder: PartialPointBinder): void {
    binderDiv = binder;
    binder
      .toProduce(_ => new StubCmd1())
      .bind();
  }

  public methodBut(binder: PartialPointBinder, widget: HTMLButtonElement): void {
    this.widget = widget;
    binderBut = binder;
    binder
      .toProduce(_ => new StubCmd2())
      .bind();
  }

  public methodDyn(binder: PartialPointBinder): void {
    binderB = binder;
    binder
      .toProduce(_ => new StubCmd3())
      .bind();
  }

  public methodParam(binder: PartialPointBinder, param: string): void {
    this.param = param;
    binderB2 = binder;
    binder
      .toProduce(_ => new StubCmd1())
      .bind();
  }
}

describe('mouseenter directive', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestingInteractoModule],
      declarations: [MouseenterBinderDirective, OnDynamicDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    ctx = TestBed.inject(BindingsContext);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('should call the binder method of the div', () => {
    expect(binderDiv).toBeDefined();
  });

  it('should call the binder method of the button', () => {
    expect(binderBut).toBeDefined();
  });

  it('should call the binder method of the b', () => {
    expect(binderB).toBeDefined();
  });

  it('should call the binder method of the b2', () => {
    expect(binderB2).toBeDefined();
  });

  it('should call b2 with the string param', () => {
    expect(fixture.componentInstance.param).toBe('bar');
  });

  it('should have the widget as second parameter', () => {
    expect(fixture.componentInstance.widget).toBe(fixture.debugElement.query(By.css('button')).nativeElement);
  });

  it('should produce a StubCmd1 on a mouseenter on the div', () => {
    const div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    robot(div).mouseenter();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
  });

  it('should produce two StubCmd1 on two mouseenter on the div', () => {
    const div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    robot(div).mouseenter().mouseenter();
    expect(ctx.commands.length).toEqual(2);
  });

  it('should produce a StubCmd2 on a mouseenter on the button', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
    robot(button).mouseenter();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
  });

  it('should produce two StubCmd2 on two mouseenter on the button', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
    robot(button).mouseenter().mouseenter();
    expect(ctx.commands.length).toEqual(2);
  });

  it('should produce a StubCmd3 on a mouseenter on b1', () => {
    robot((fixture.debugElement.query(By.css('#b1')).nativeElement as HTMLElement)).mouseenter();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
  });

  it('should produce a StubCmd1 on a mouseenter on b2', () => {
    robot((fixture.debugElement.query(By.css('#b2')).nativeElement as HTMLElement)).mouseenter();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
  });
});
