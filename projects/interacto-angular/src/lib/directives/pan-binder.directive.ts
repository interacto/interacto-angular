import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialTouchSrcTgtTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioPan]",
    standalone: true
})
export class PanBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTouchSrcTgtTypedBinder> {
    @Output()
    private readonly panBinder: EventEmitter<PartialTouchSrcTgtTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.panBinder = new EventEmitter<PartialTouchSrcTgtTypedBinder>();
    }

    /**
     * Defines whether the user can cancel the pan
     */
    @Input()
    public cancellable = false;

    /**
     * Starts the creation of a binding using the pan interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioPan(fn: ((partialBinder: PartialTouchSrcTgtTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialTouchSrcTgtTypedBinder {
        return this.bindings.panBinder(this.cancellable);
    }

    protected getOutputEvent(): EventEmitter<PartialTouchSrcTgtTypedBinder> {
        return this.panBinder;
    }
}
