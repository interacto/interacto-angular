import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialTouchTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioLongTouch]",
    standalone: true
})
export class LongTouchBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTouchTypedBinder> {
    @Output()
    private readonly longTouchBinder: EventEmitter<PartialTouchTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.longTouchBinder = new EventEmitter<PartialTouchTypedBinder>();
    }

    /**
     * The duration of the touch to end the user interaction.
     * If this duration is not reached, the interaction is cancelled.
     */
    @Input()
    public duration = 1000;

    /**
     * Starts the creation of a binding using the long touch interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioLongTouch(fn: ((partialBinder: PartialTouchTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialTouchTypedBinder {
        return this.bindings.longTouchBinder(this.duration);
    }

    protected getOutputEvent(): EventEmitter<PartialTouchTypedBinder> {
        return this.longTouchBinder;
    }
}
