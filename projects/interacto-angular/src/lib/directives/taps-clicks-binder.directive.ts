import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, UndoHistoryBase} from "interacto";
import type {PartialPointsOrTapsTypedBinder} from "interacto";

@Directive({
    selector: "[ioClicksOrTaps]",
    standalone: true
})
export class ClickOrTapsBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointsOrTapsTypedBinder> {
    @Output()
    private readonly clicksOrTapsBinder: EventEmitter<PartialPointsOrTapsTypedBinder>;

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
        this.clicksOrTapsBinder = new EventEmitter<PartialPointsOrTapsTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the taps or clicks interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioClicksOrTaps(fn: ((partialBinder: PartialPointsOrTapsTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialPointsOrTapsTypedBinder {
        return this.bindings.tapsOrClicksBinder(this.nbTaps);
    }

    protected getOutputEvent(): EventEmitter<PartialPointsOrTapsTypedBinder> {
        return this.clicksOrTapsBinder;
    }
}
