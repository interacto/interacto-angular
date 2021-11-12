import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BindingsContext, PartialPointsBinder} from 'interacto';
import {TestingInteractoModule} from '../testing-interacto-angular.module';
import {StubCmd1, StubCmd2, StubCmd3, StubCmd4} from './fixture-directive.spec';
import {ClicksBinderDirective} from './clicks-binder.directive';
import {By} from '@angular/platform-browser';

let fixture: ComponentFixture<TestComponentClicks>;
let binderDiv: PartialPointsBinder;
let binderBut: PartialPointsBinder;
let binderB: PartialPointsBinder;
let binderP: PartialPointsBinder;
let ctx: BindingsContext;

@Component({
  template: `
    <div [ioClicks]="methodDiv">1</div>
    <button [ioClicks]="methodBut">2</button>
    <b id="b" ioOnDynamic [ioClicks]="methodDyn"><b id="b1">B</b></b>
    <p id="p1" [ioClicks]="method3Clicks" count="3"></p>
    <p id="p2" [ioClicks]="methodDiv" count="a"></p>`
})
class TestComponentClicks {
  public methodDiv(binder: PartialPointsBinder): void {
    binderDiv = binder;
    binder
      .toProduce(_ => new StubCmd1())
      .bind();
  }

  public methodBut(binder: PartialPointsBinder): void {
    binderBut = binder;
    binder
      .toProduce(_ => new StubCmd2())
      .bind();
  }

  public methodDyn(binder: PartialPointsBinder): void {
    binderB = binder;
    binder
      .toProduce(_ => new StubCmd3())
      .bind();
  }

  public method3Clicks(binder: PartialPointsBinder): void {
    binderP = binder;
    binder
      .toProduce(_ => new StubCmd4())
      .bind();
  }
}

describe('clicks directive', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestingInteractoModule],
      declarations: [ClicksBinderDirective, TestComponentClicks]
    }).createComponent(TestComponentClicks);

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

  it('should call the binder method of the p', () => {
    expect(binderP).toBeDefined();
  });

  it('should produce a StubCmd1 on two clicks on the div', () => {
    const div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    div.click();
    div.click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
  });

  it('should produce two StubCmd1 on four clicks on the div', () => {
    const div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    div.click();
    div.click();
    div.click();
    div.click();
    expect(ctx.commands.length).toEqual(2);
  });

  it('should produce a StubCmd2 on two clicks on the button', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
    button.click();
    button.click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
  });

  it('should produce a StubCmd3 on two clicks on b1', () => {
    const b1 = fixture.debugElement.query(By.css('#b1')).nativeElement as HTMLElement;
    b1.click();
    b1.click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
  });

  it('should produce a StubCmd3 on two clicks on b2', async () => {
    const b = fixture.debugElement.query(By.css('#b'));
    const div = document.createElement("div");
    div.setAttribute("id", "b2");
    b.nativeElement.appendChild(div);
    await Promise.resolve();

    const b2 = fixture.debugElement.query(By.css('#b2')).nativeElement as HTMLElement;
    b2.click();
    b2.click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
  });

  it('should produce no StubCmd4 on two clicks on the p', () => {
    const p = fixture.debugElement.query(By.css('#p1')).nativeElement as HTMLElement;
    p.click();
    p.click();
    expect(ctx.commands.length).toEqual(0);
  });

  it('should produce a StubCmd4 on three clicks on the p', () => {
    const p = fixture.debugElement.query(By.css('#p1')).nativeElement as HTMLElement;
    p.click();
    p.click();
    p.click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd4);
  });

  it('should support an invalid format pf "number"', () => {
    const p = fixture.debugElement.query(By.css('#p2')).nativeElement as HTMLElement;
    p.click();
    p.click();
    expect(ctx.commands.length).toEqual(1);
    expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
  });
});
