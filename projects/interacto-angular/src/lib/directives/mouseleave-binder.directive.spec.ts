import {StubCmd1, StubCmd2, StubCmd3} from "./fixture-directive.spec";
import {MouseleaveBinderDirective} from "./mouseleave-binder.directive";
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
    <div [ioMouseleave]="methodDiv">1</div>
    <button [ioMouseleave]="methodBut">2</button>
    <div id="b" ioOnDynamic [ioMouseleave]="methodDyn"><b id="b1">B</b></div>
    <b id="b2" [ioMouseleave] (mouseleaveBinder)="methodParam($event, 'bar')"></b>`,
    standalone: true,
    imports: [MouseleaveBinderDirective, OnDynamicDirective]
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

describe("ioMouseleave directive", () => {
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [TestingInteractoModule, MouseleaveBinderDirective, OnDynamicDirective, TestComponent]
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
        expect(fixture.componentInstance.param).toBe("bar");
    });

    it("should have the widget as second parameter", () => {
        expect(fixture.componentInstance.widget).toBe(fixture.debugElement.query(By.css("button")).nativeElement);
    });

    it("should produce a StubCmd1 on a mouseleave on the div", () => {
        const div = fixture.debugElement.query(By.css("div")).nativeElement as HTMLElement;
        robot(div).mouseleave();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });

    it("should produce two StubCmd1 on two mouseleave on the div", () => {
        const div = fixture.debugElement.query(By.css("div")).nativeElement as HTMLElement;
        robot(div).mouseleave()
            .mouseleave();
        expect(ctx.commands.length).toEqual(2);
    });

    it("should produce a StubCmd2 on a mouseleave on the button", () => {
        const button = fixture.debugElement.query(By.css("button")).nativeElement as HTMLElement;
        robot(button).mouseleave();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
    });

    it("should produce two StubCmd2 on two mouseleave on the button", () => {
        const button = fixture.debugElement.query(By.css("button")).nativeElement as HTMLElement;
        robot(button).mouseleave()
            .mouseleave();
        expect(ctx.commands.length).toEqual(2);
    });

    it("should produce a StubCmd3 on a mouseleave on b1", () => {
        robot((fixture.debugElement.query(By.css("#b1")).nativeElement as HTMLElement)).mouseleave();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
    });

    it("should produce a StubCmd1 on a mouseleave on b2", () => {
        robot((fixture.debugElement.query(By.css("#b2")).nativeElement as HTMLElement)).mouseleave();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });
});
