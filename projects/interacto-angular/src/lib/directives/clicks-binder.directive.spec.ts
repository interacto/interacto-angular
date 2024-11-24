import {ClicksBinderDirective} from "./clicks-binder.directive";
import {StubCmd1, StubCmd2, StubCmd3, StubCmd4} from "./fixture-directive.spec";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {TestingInteractoModule} from "../testing-interacto-angular.module";
import {Component} from "@angular/core";
import {TestBed, ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {BindingsContext, PartialPointsTypedBinder} from "interacto";
import {robot} from "interacto-nono";

let binderDiv: PartialPointsTypedBinder;
let binderBut: PartialPointsTypedBinder;
let binderB: PartialPointsTypedBinder;
let binderP: PartialPointsTypedBinder;
let ctx: BindingsContext;
let param: string | undefined;

@Component({
    template: `
    <div [ioClicks]="methodDiv">1</div>
    <button [ioClicks]="methodBut">2</button>
    <button id="b4" ioClicks (clicksBinder)="m4($event, 'y')">2</button>
    <div id="b" ioOnDynamic [ioClicks]="methodDyn"><b id="b1">B</b></div>
    <p id="p1" [ioClicks]="method3Clicks" count="3"></p>
    <p id="p2" [ioClicks]="methodDiv" count="a"></p>`,
    standalone: true,
    imports: [ClicksBinderDirective, OnDynamicDirective]
})
class TestComponentClicks {
    public methodDiv(binder: PartialPointsTypedBinder): void {
        binderDiv = binder;
        binder
            .toProduce(() => new StubCmd1())
            .bind();
    }

    public methodBut(binder: PartialPointsTypedBinder): void {
        binderBut = binder;
        binder
            .toProduce(() => new StubCmd2())
            .bind();
    }

    public methodDyn(binder: PartialPointsTypedBinder): void {
        binderB = binder;
        binder
            .toProduce(() => new StubCmd3())
            .bind();
    }

    public method3Clicks(binder: PartialPointsTypedBinder): void {
        binderP = binder;
        binder
            .toProduce(() => new StubCmd4())
            .bind();
    }

    public m4(binder: PartialPointsTypedBinder, p: string): void {
        param = p;
        binderP = binder;
        binder
            .toProduce(() => new StubCmd4())
            .bind();
    }
}

let fixture: ComponentFixture<TestComponentClicks>;

describe("clicks directive", () => {
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [TestingInteractoModule, ClicksBinderDirective, OnDynamicDirective, TestComponentClicks]
        }).createComponent(TestComponentClicks);

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

    it("should call the binder method of the p", () => {
        expect(binderP).toBeDefined();
    });

    it("should produce a StubCmd1 on two clicks on the div", () => {
        const div = fixture.debugElement.query(By.css("div")).nativeElement as HTMLElement;
        robot().click(div, 2);
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });

    it("should produce a StubCmd4 on two clicks on b4", () => {
        const div = fixture.debugElement.query(By.css("#b4")).nativeElement as HTMLElement;
        robot().click(div, 2);
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd4);
        expect(param).toBe("y");
    });

    it("should produce two StubCmd1 on four clicks on the div", () => {
        const div = fixture.debugElement.query(By.css("div")).nativeElement as HTMLElement;
        robot().click(div, 4);
        expect(ctx.commands.length).toEqual(2);
    });

    it("should produce a StubCmd2 on two clicks on the button", () => {
        const button = fixture.debugElement.query(By.css("button")).nativeElement as HTMLElement;
        robot().click(button, 2);
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
    });

    it("should produce a StubCmd3 on two clicks on b1", () => {
        const b1 = fixture.debugElement.query(By.css("#b1")).nativeElement as HTMLElement;
        robot().click(b1, 2);
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
    });

    it("should produce no StubCmd4 on two clicks on the p", () => {
        const p = fixture.debugElement.query(By.css("#p1")).nativeElement as HTMLElement;
        robot().click(p, 2);
        expect(ctx.commands.length).toEqual(0);
    });

    it("should produce a StubCmd4 on three clicks on the p", () => {
        const p = fixture.debugElement.query(By.css("#p1")).nativeElement as HTMLElement;
        robot().click(p, 3);
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd4);
    });

    it("should support an invalid format pf \"number\"", () => {
        const p = fixture.debugElement.query(By.css("#p2")).nativeElement as HTMLElement;
        robot(p).click(p, 2);
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });
});
