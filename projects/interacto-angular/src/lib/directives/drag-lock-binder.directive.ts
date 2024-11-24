import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialPointSrcTgtTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioDragLock]",
    standalone: true
})
export class DragLockBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtTypedBinder> {
    @Output()
    private readonly dragLockBinder: EventEmitter<PartialPointSrcTgtTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.dragLockBinder = new EventEmitter<PartialPointSrcTgtTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the drag lock interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioDragLock(fn: ((partialBinder: PartialPointSrcTgtTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialPointSrcTgtTypedBinder {
        return this.bindings.dragLockBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialPointSrcTgtTypedBinder> {
        return this.dragLockBinder;
    }
}
