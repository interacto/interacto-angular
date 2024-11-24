import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialTapTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioTap]",
    standalone: true
})
export class TapBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTapTypedBinder> {
    @Output()
    private readonly tapBinder: EventEmitter<PartialTapTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.tapBinder = new EventEmitter<PartialTapTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the tap interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioTap(fn: ((partialBinder: PartialTapTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialTapTypedBinder {
        return this.bindings.tapBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialTapTypedBinder> {
        return this.tapBinder;
    }
}
