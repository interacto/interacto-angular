import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, UndoHistoryBase} from "interacto";
import type {PartialPointOrTouchTypedBinder} from "interacto";

@Directive({
    selector: "[ioClickOrTap]",
    standalone: true
})
export class ClickOrTapBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointOrTouchTypedBinder> {
    @Output()
    private readonly clickOrTapBinder: EventEmitter<PartialPointOrTouchTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.clickOrTapBinder = new EventEmitter<PartialPointOrTouchTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the tap or click interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioClickOrTap(fn: ((partialBinder: PartialPointOrTouchTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialPointOrTouchTypedBinder {
        return this.bindings.tapOrClickBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialPointOrTouchTypedBinder> {
        return this.clickOrTapBinder;
    }
}
