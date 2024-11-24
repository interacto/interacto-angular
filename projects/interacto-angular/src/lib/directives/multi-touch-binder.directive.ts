import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialMultiTouchTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioMultiTouch]",
    standalone: true
})
export class MultiTouchBinderDirective extends InteractoBinderDirective<HTMLElement, PartialMultiTouchTypedBinder> {
    @Output()
    private readonly multiTouchBinder: EventEmitter<PartialMultiTouchTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.multiTouchBinder = new EventEmitter<PartialMultiTouchTypedBinder>();
    }

    /**
     * The number of required touches.
     * A multi-touch starts when all its touches have started.
     * A multi-touch ends when the number of required touches is greater than the number of touches.
     */
    @Input()
    public nbTouches = 2;

    /**
     * Starts the creation of a binding using the multi touch interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioMultiTouch(fn: ((partialBinder: PartialMultiTouchTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialMultiTouchTypedBinder {
        return this.bindings.multiTouchBinder(this.nbTouches);
    }

    protected getOutputEvent(): EventEmitter<PartialMultiTouchTypedBinder> {
        return this.multiTouchBinder;
    }
}
