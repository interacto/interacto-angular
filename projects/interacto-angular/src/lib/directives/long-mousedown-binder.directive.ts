import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialUpdatePointTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioLongMousedown]",
    standalone: true
})
export class LongMousedownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialUpdatePointTypedBinder> {
    @Output()
    private readonly longMousedownBinder: EventEmitter<PartialUpdatePointTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.longMousedownBinder = new EventEmitter<PartialUpdatePointTypedBinder>();
    }

    /**
     * The duration of the pressure to end the user interaction.
     * If this duration is not reached, the interaction is cancelled.
     */
    @Input()
    public duration = 1000;

    /**
     * Starts the creation of a binding using the long press interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioLongMousedown(fn: ((partialBinder: PartialUpdatePointTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialUpdatePointTypedBinder {
        return this.bindings.longMouseDownBinder(this.duration);
    }

    protected getOutputEvent(): EventEmitter<PartialUpdatePointTypedBinder> {
        return this.longMousedownBinder;
    }
}
