import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialTapsTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioTaps]",
    standalone: true
})
export class TapsBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTapsTypedBinder> {
    @Output()
    private readonly tapsBinder: EventEmitter<PartialTapsTypedBinder>;

    /**
     * The number of taps expected to end the interaction.
     * If this number is not reached after a timeout, the interaction is cancelled.
     */
    @Input()
    public nbTaps = 2;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.tapsBinder = new EventEmitter<PartialTapsTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the taps interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioTaps(fn: ((partialBinder: PartialTapsTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialTapsTypedBinder {
        return this.bindings.tapsBinder(this.nbTaps);
    }

    protected getOutputEvent(): EventEmitter<PartialTapsTypedBinder> {
        return this.tapsBinder;
    }
}
