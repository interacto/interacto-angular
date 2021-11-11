import {ClickBinderDirective} from './click-binder.directive';
import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BindingsContext, PartialPointBinder} from 'interacto';
import {TestingInteractoModule} from '../testing-interacto-angular.module';
import {StubCmd1, StubCmd2, StubCmd3} from './fixture-directive.spec';

let fixture: ComponentFixture<TestComponent>;
let div: DebugElement;
let button: DebugElement;
let b: DebugElement;
let binderDiv: PartialPointBinder;
let binderBut: PartialPointBinder;
let binderB: PartialPointBinder;
let ctx: BindingsContext;

@Component({
  template: `
    <div [ioClick]="methodDiv">1</div>
    <button [ioClick]="methodBut">2</button>
    <b id="b" ioOnDynamic [ioClick]="methodDyn"><b id="b1">B</b></b>`
})
class TestComponent {
  public methodDiv(binder: PartialPointBinder): void {
    binderDiv = binder;
    binder
      .toProduce(_ => new StubCmd1())
      .bind();
  }

  public methodBut(binder: PartialPointBinder): void {
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
}

beforeEach(() => {
  fixture = TestBed.configureTestingModule({
    imports: [TestingInteractoModule],
    declarations: [ ClickBinderDirective, TestComponent ]
  }).createComponent(TestComponent);

  fixture.detectChanges();

  div = fixture.debugElement.query(By.css('div'));
  button = fixture.debugElement.query(By.css('button'));
  b = fixture.debugElement.query(By.css('#b'));
  ctx = TestBed.inject(BindingsContext);
});


it('should call the binder method of the div', () => {
  expect(binderDiv).toBeDefined();
});

it('should call the binder method of the button', () => {
  expect(binderBut).toBeDefined();
});

it('should call the binder method of the b', () => {
  expect(binderB).toBeDefined();
});

it('should produce a StubCmd1 on a click on the div', () => {
  (div.nativeElement as HTMLElement).click();
  expect(ctx.commands.length).toEqual(1);
  expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
});

it('should produce two StubCmd1 on two click on the div', () => {
  (div.nativeElement as HTMLElement).click();
  (div.nativeElement as HTMLElement).click();
  expect(ctx.commands.length).toEqual(2);
});

it('should produce a StubCmd2 on a click on the button', () => {
  (button.nativeElement as HTMLElement).click();
  expect(ctx.commands.length).toEqual(1);
  expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
});

it('should produce two StubCmd2 on two clicks on the button', () => {
  (button.nativeElement as HTMLElement).click();
  (button.nativeElement as HTMLElement).click();
  expect(ctx.commands.length).toEqual(2);
});

it('should produce a StubCmd3 on a click on b1', () => {
  (fixture.debugElement.query(By.css('#b1')).nativeElement as HTMLElement).click();
  expect(ctx.commands.length).toEqual(1);
  expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
});

it('should produce a StubCmd3 on a click on b2', async () => {
  const div = document.createElement("div");
  div.setAttribute("id", "b2");
  b.nativeElement.appendChild(div);
  await Promise.resolve();

  (fixture.debugElement.query(By.css('#b2')).nativeElement as HTMLElement).click();
  expect(ctx.commands.length).toEqual(1);
  expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
});
