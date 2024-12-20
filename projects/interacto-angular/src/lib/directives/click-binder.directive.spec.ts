import {ClickBinderDirective} from "./click-binder.directive";
import {StubCmd1, StubCmd2, StubCmd3} from "./fixture-directive.spec";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {TestingInteractoModule} from "../testing-interacto-angular.module";
import {Component} from "@angular/core";
import {TestBed, ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {BindingsContext, PartialPointTypedBinder} from "interacto";
import {robot} from "interacto-nono";

let binderDiv: PartialPointTypedBinder;
let binderBut: PartialPointTypedBinder;
let binderB: PartialPointTypedBinder;
let binderB2: PartialPointTypedBinder;
let ctx: BindingsContext;

@Component({
    template: `
      <div id="d1" [ioClick]="methodDiv">1</div>
      <button [ioClick]="methodBut">2</button>
      <div id="b" ioOnDynamic [ioClick]="methodDyn"><b id="b1">B</b></div>
      <b id="b2" ioClick (clickBinder)="methodParam($event, 'foo')"></b>
      <b ioClick>bad</b>
      <b [ioClick]="fff">bad2</b>,
      @if(true) {<div id="d3" [ioClick]="methodDiv">3</div>}
      @switch(true) { @case(true) {<div id="d4" [ioClick]="methodDiv">4</div>} }
      @switch(true) { @case(false) {} @default{ <div id="d5" [ioClick]="methodDiv">5</div>} }`,
    standalone: true,
    imports: [ClickBinderDirective, OnDynamicDirective]
})
class TestComponent {
    public param = "";

    public widget?: HTMLButtonElement = undefined;

    public methodDiv(binder: PartialPointTypedBinder): void {
        binderDiv = binder;
        binder
            .toProduce(() => new StubCmd1())
            .bind();
    }

    public methodBut(binder: PartialPointTypedBinder, widget: HTMLButtonElement): void {
        this.widget = widget;
        binderBut = binder;
        binder
            .toProduce(() => new StubCmd2())
            .bind();
    }

    public methodDyn(binder: PartialPointTypedBinder): void {
        binderB = binder;
        binder
            .toProduce(() => new StubCmd3())
            .bind();
    }

    public methodParam(binder: PartialPointTypedBinder, param: string): void {
        this.param = param;
        binderB2 = binder;
        binder
            .toProduce(() => new StubCmd1())
            .bind();
    }
}

let fixture: ComponentFixture<TestComponent>;

describe("click directive", () => {
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [TestingInteractoModule, ClickBinderDirective, OnDynamicDirective, TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges();

        ctx = TestBed.inject(BindingsContext);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("should call the binder method of the div", () => {
        expect(binderDiv).toBeDefined();
    });

    it("should call the binder method of the button", () => {
        expect(binderBut).toBeDefined();
    });

    it("should call the binder method of the b", () => {
        expect(binderB).toBeDefined();
    });

    it("should call the binder method of the b2", () => {
        expect(binderB2).toBeDefined();
    });

    it("should call b2 with the string param", () => {
        expect(fixture.componentInstance.param).toBe("foo");
    });

    it("should have the widget as second parameter", () => {
        expect(fixture.componentInstance.widget).toBe(fixture.debugElement.query(By.css("button")).nativeElement);
    });

    it("should produce a StubCmd1 on a click on the div", () => {
        const div = fixture.debugElement.query(By.css("#d1")).nativeElement as HTMLElement;
        robot(div).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });

    it("should produce a StubCmd1 on a click on the div in a if statement", () => {
        const div = fixture.debugElement.query(By.css("#d3")).nativeElement as HTMLElement;
        robot(div).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });

    it("should produce a StubCmd1 on a click on the div in a switch case statement", () => {
        const div = fixture.debugElement.query(By.css("#d4")).nativeElement as HTMLElement;
        robot(div).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });

    it("should produce a StubCmd1 on a click on the div in a switch default statement", () => {
        const div = fixture.debugElement.query(By.css("#d5")).nativeElement as HTMLElement;
        robot(div).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });

    it("should produce two StubCmd1 on two click on the div", () => {
        const div = fixture.debugElement.query(By.css("#d1")).nativeElement as HTMLElement;
        robot().click(div, 2);
        expect(ctx.commands.length).toEqual(2);
    });

    it("should produce a StubCmd2 on a click on the button", () => {
        const button = fixture.debugElement.query(By.css("button")).nativeElement as HTMLElement;
        robot(button).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
    });

    it("should produce two StubCmd2 on two clicks on the button", () => {
        const button = fixture.debugElement.query(By.css("button")).nativeElement as HTMLElement;
        robot().click(button, 2);
        expect(ctx.commands.length).toEqual(2);
    });

    it("should produce a StubCmd3 on a click on b1", () => {
        robot((fixture.debugElement.query(By.css("#b1")).nativeElement as HTMLElement)).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
    });

    it("should produce a StubCmd1 on a click on b2", () => {
        robot((fixture.debugElement.query(By.css("#b2")).nativeElement as HTMLElement)).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });
});
