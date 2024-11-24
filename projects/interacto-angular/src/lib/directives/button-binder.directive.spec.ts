import {ButtonBinderDirective} from "./button-binder.directive";
import {StubCmd1, StubCmd2, StubCmd3} from "./fixture-directive.spec";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {TestingInteractoModule} from "../testing-interacto-angular.module";
import {Component} from "@angular/core";
import {TestBed, ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {BindingsContext, PartialButtonTypedBinder} from "interacto";
import {robot} from "interacto-nono";

let b1: PartialButtonTypedBinder;
let b2: PartialButtonTypedBinder;
let b3: PartialButtonTypedBinder;
let ctx: BindingsContext;

@Component({
    template: `
    <button id="b1" [ioButton]="m1">1</button>
    <div id="b2" ioOnDynamic [ioButton]="m2"><button id="b4">B</button></div>
    <button id="b3" [ioButton] (buttonBinder)="m3($event, 123)">b3</button>
    <button ioButton>Bad</button>
    <button [ioButton]="rr">Bad2</button>`,
    standalone: true,
    imports: [ButtonBinderDirective, OnDynamicDirective]
})
class TestComponent {
    public param = 0;

    public widget?: HTMLButtonElement = undefined;

    public m1(binder: PartialButtonTypedBinder, widget: HTMLButtonElement): void {
        this.widget = widget;
        b1 = binder;
        binder
            .toProduce(() => new StubCmd1())
            .bind();
    }

    public m2(binder: PartialButtonTypedBinder): void {
        b2 = binder;
        binder
            .toProduce(() => new StubCmd2())
            .bind();
    }

    public m3(binder: PartialButtonTypedBinder, param: number): void {
        this.param = param;
        b3 = binder;
        binder
            .toProduce(() => new StubCmd3())
            .bind();
    }
}

let fixture: ComponentFixture<TestComponent>;

describe("button directive", () => {
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [TestingInteractoModule, ButtonBinderDirective, OnDynamicDirective, TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges();

        ctx = TestBed.inject(BindingsContext);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("should call the binder method of b1", () => {
        expect(b1).toBeDefined();
    });

    it("should call the binder method of b2", () => {
        expect(b2).toBeDefined();
    });

    it("should call the binder method of b3", () => {
        expect(b3).toBeDefined();
    });

    it("should call m3 with the param", () => {
        expect(fixture.componentInstance.param).toBe(123);
    });

    it("should have the widget as second parameter", () => {
        expect(fixture.componentInstance.widget).toBe((fixture.debugElement.query(By.css("#b1")).nativeElement));
    });

    it("should produce a StubCmd1 on a click on b1", () => {
        const div = fixture.debugElement.query(By.css("#b1")).nativeElement as HTMLElement;
        robot(div).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd1);
    });

    it("should produce two StubCmd1 on two click on b1", () => {
        const div = fixture.debugElement.query(By.css("#b1")).nativeElement as HTMLElement;
        robot().click(div, 2);
        expect(ctx.commands.length).toEqual(2);
    });

    it("should produce a StubCmd2 on a click on b4", () => {
        const button = fixture.debugElement.query(By.css("#b4")).nativeElement as HTMLElement;
        robot(button).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd2);
    });

    it("should produce a StubCmd3 on a click on b3", () => {
        robot((fixture.debugElement.query(By.css("#b3")).nativeElement as HTMLElement)).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(StubCmd3);
    });
});
