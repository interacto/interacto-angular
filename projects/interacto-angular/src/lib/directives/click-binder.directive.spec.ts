import {ClickBinderDirective} from './click-binder.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BindingsContext, PartialPointBinder} from 'interacto';
import {TestingInteractoModule} from '../testing-interacto-angular.module';
import {StubCmd1, StubCmd2, StubCmd3} from './fixture-directive.spec';
import {robot} from 'interacto-nono';

let fixture: ComponentFixture<TestComponent>;
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

describe('click directive', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestingInteractoModule],
      declarations: [ClickBinderDirective, TestComponent]
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

  it('should produce a StubCmd1 on a click on the div', () => {
    const div = fixture.debugElement.query(By.css('div')) .nativeElement as HTMLElement;
    robot(div).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
  });

  it('should produce two StubCmd1 on two click on the div', () => {
    const div = fixture.debugElement.query(By.css('div')) .nativeElement as HTMLElement;
    robot().click(div, 2);
    expect(ctx.commands.length).toEqual(2);
  });

  it('should produce a StubCmd2 on a click on the button', () => {
    const button = fixture.debugElement.query(By.css('button')) .nativeElement as HTMLElement;
    robot(button).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
  });

  it('should produce two StubCmd2 on two clicks on the button', () => {
    const button = fixture.debugElement.query(By.css('button')) .nativeElement as HTMLElement;
    robot().click(button, 2);
    expect(ctx.commands.length).toEqual(2);
  });

  it('should produce a StubCmd3 on a click on b1', () => {
    robot((fixture.debugElement.query(By.css('#b1')).nativeElement as HTMLElement)).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
  });

  it('should produce a StubCmd3 on a click on b2', async () => {
    const div = document.createElement("div");
    div.setAttribute("id", "b2");
    fixture.debugElement.query(By.css('#b')).nativeElement.appendChild(div);
    await Promise.resolve();

    robot((fixture.debugElement.query(By.css('#b2')).nativeElement as HTMLElement)).click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
  });
});
