import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialUpdatePointTypedBinder, PointData, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioDoubleClick]",
    standalone: true
})
export class DoubleClickBinderDirective extends InteractoBinderDirective<HTMLElement, PartialUpdatePointTypedBinder> {
    @Output()
    private readonly dbleclickBinder: EventEmitter<PartialUpdatePointTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.dbleclickBinder = new EventEmitter<PartialUpdatePointTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the double-click interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioDoubleClick(fn: ((partialBinder: PartialUpdatePointTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<PointData>, unknown> | Array<Binding<Command, Interaction<PointData>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialUpdatePointTypedBinder {
        return this.bindings.dbleClickBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialUpdatePointTypedBinder> {
        return this.dbleclickBinder;
    }
}
