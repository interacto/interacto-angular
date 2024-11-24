import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialPointTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioMouseup]",
    standalone: true
})
export class MouseupBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointTypedBinder> {
    @Output()
    private readonly mouseupBinder: EventEmitter<PartialPointTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.mouseupBinder = new EventEmitter<PartialPointTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the mouse press interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioMouseup(fn: ((partialBinder: PartialPointTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialPointTypedBinder {
        return this.bindings.mouseUpBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialPointTypedBinder> {
        return this.mouseupBinder;
    }
}
