import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BindingsContext, PartialButtonBinder} from 'interacto';
import {TestingInteractoModule} from '../testing-interacto-angular.module';
import {StubCmd1, StubCmd2, StubCmd3} from './fixture-directive.spec';
import {robot} from 'interacto-nono';
import {ButtonBinderDirective} from './button-binder.directive';

let fixture: ComponentFixture<TestComponent>;
let b1: PartialButtonBinder;
let b2: PartialButtonBinder;
let b3: PartialButtonBinder;
let ctx: BindingsContext;

@Component({
  template: `
    <button id="b1" [ioWidget]="m1">1</button>
    <button id="b2" ioOnDynamic [ioWidget]="m2"><button id="b4">B</button></button>
    <button id="b3" [ioWidget] (ioBinder)="m3($event, 123)"></button>
    <button ioWidget>Bad</button>
    <button [ioWidget]="rr">Bad2</button>`
})
class TestComponent {
  public param: number = 0;
  public widget?: HTMLButtonElement = undefined;

  public m1(binder: PartialButtonBinder, widget: HTMLButtonElement): void {
    this.widget = widget;
    b1 = binder;
    binder
      .toProduce(_ => new StubCmd1())
      .bind();
  }

  public m2(binder: PartialButtonBinder): void {
    b2 = binder;
    binder
      .toProduce(_ => new StubCmd2())
      .bind();
  }

  public m3(binder: PartialButtonBinder, param: number): void {
    this.param = param;
    b3 = binder;
    binder
      .toProduce(_ => new StubCmd3())
      .bind();
  }
}

describe('button directive', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestingInteractoModule],
      declarations: [ButtonBinderDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    ctx = TestBed.inject(BindingsContext);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('should call the binder method of b1', () => {
    expect(b1).toBeDefined();
  });

  it('should call the binder method of b2', () => {
    expect(b2).toBeDefined();
  });

  it('should call the binder method of b3', () => {
    expect(b3).toBeDefined();
  });

  it('should call m3 with the param', () => {
    expect(fixture.componentInstance.param).toBe(123);
  });

  it('should have the widget as second parameter', () => {
    expect(fixture.componentInstance.widget).toBe((fixture.debugElement.query(By.css('#b1')).nativeElement));
  });

  it('should produce a StubCmd1 on a click on b1', () => {
    const div = fixture.debugElement.query(By.css('#b1')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
  });

  it('should produce two StubCmd1 on two click on b1', () => {
    const div = fixture.debugElement.query(By.css('#b1')).nativeElement as HTMLElement;
    robot().click(div, 2);
    expect(ctx.commands.length).toEqual(2);
  });

  it('should produce a StubCmd2 on a click on b4', () => {
    const button = fixture.debugElement.query(By.css('#b4')) .nativeElement as HTMLElement;
    robot(button).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
  });

  it('should produce a StubCmd3 on a click on b3', () => {
    robot((fixture.debugElement.query(By.css('#b3')).nativeElement as HTMLElement)).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
  });

  it('should produce a StubCmd2 on a click on b5', () => {
    const b = document.createElement("button");
    b.setAttribute("id", "b5");
    fixture.debugElement.query(By.css('#b2')).nativeElement.appendChild(b);
    fixture.detectChanges();

    robot((fixture.debugElement.query(By.css('#b5')).nativeElement as HTMLElement)).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
  });
});
