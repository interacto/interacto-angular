import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialPointSrcTgtTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioDnd]",
    standalone: true
})
export class DndBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtTypedBinder> {
    @Output()
    private readonly dndBinder: EventEmitter<PartialPointSrcTgtTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.dndBinder = new EventEmitter<PartialPointSrcTgtTypedBinder>();
    }

    @Input()
    public cancellable = true;

    /**
     * Starts the creation of a binding using the key pressure interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioDnd(fn: ((partialBinder: PartialPointSrcTgtTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialPointSrcTgtTypedBinder {
        return this.bindings.dndBinder(this.cancellable);
    }

    protected getOutputEvent(): EventEmitter<PartialPointSrcTgtTypedBinder> {
        return this.dndBinder;
    }
}
