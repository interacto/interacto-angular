import {StubCmd5} from "./fixture-directive.spec";
import {UndoBinderDirective, PartialUndoButtonBinder} from "./undo-binder.directive";
import {TestingInteractoModule} from "../testing-interacto-angular.module";
import {Component} from "@angular/core";
import {TestBed, ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {BindingsContext, Undo, UndoHistory} from "interacto";
import {robot} from "interacto-nono";

let b2: PartialUndoButtonBinder;
let fn: () => void;

@Component({
    template: `
    <button id="b1" ioUndo>1</button>
    <button id="b2" [ioUndo]="m2">2</button>`,
    standalone: true,
    imports: [UndoBinderDirective]
})
class TestComponent {
    public widget?: HTMLButtonElement = undefined;

    public m2(binder: PartialUndoButtonBinder, widget: HTMLButtonElement): void {
        this.widget = widget;
        b2 = binder;
        binder
            .end(fn)
            .bind();
    }
}

let fixture: ComponentFixture<TestComponent>;
let ctx: BindingsContext;
let history: UndoHistory;

describe("undo directive", () => {
    beforeEach(() => {
        fn = jasmine.createSpy();

        fixture = TestBed.configureTestingModule({
            imports: [TestingInteractoModule, UndoBinderDirective, TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges();

        ctx = TestBed.inject(BindingsContext);
        history = TestBed.inject(UndoHistory);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("should create the bindings", () => {
        expect(ctx.bindings.length).toBe(2);
    });

    it("should call the binder method of b2", () => {
        expect(b2).toBeDefined();
    });

    it("should produce an undo on a click on b1", () => {
        history.add(new StubCmd5());
        const div = fixture.debugElement.query(By.css("#b1")).nativeElement as HTMLElement;
        robot(div).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(Undo);
    });

    it("should produce an undo on a click on b2", () => {
        history.add(new StubCmd5());
        const div = fixture.debugElement.query(By.css("#b2")).nativeElement as HTMLElement;
        robot(div).click();
        expect(ctx.commands.length).toEqual(1);
        expect(ctx.commands[0]).toBeInstanceOf(Undo);
    });

    it("should call specific routines on a click on b2", () => {
        history.add(new StubCmd5());
        const div = fixture.debugElement.query(By.css("#b2")).nativeElement as HTMLElement;
        robot(div).click();
        expect(fn).toHaveBeenCalledTimes(1);
    });
});
