import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialInputTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "input:[ioInput] :not([type=text]), [ioInput] [ioOnDynamic]",
    standalone: true
})
export class InputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialInputTypedBinder> {
    @Output()
    private readonly inputBinder: EventEmitter<PartialInputTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLInputElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.inputBinder = new EventEmitter<PartialInputTypedBinder>();
    }

    @Input()
    public set ioInput(fn: ((partialBinder: PartialInputTypedBinder, widget: HTMLInputElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialInputTypedBinder {
        const elt = this.getElementContent();

        if (elt instanceof HTMLInputElement) {
            switch (elt.type) {
                case "checkbox":
                case "radio":
                    return this.bindings.checkboxBinder();
                case "color":
                    return this.bindings.colorPickerBinder();
                case "date":
                    return this.bindings.dateBinder();
                case "number":
                    return this.bindings.spinnerBinder();
            }
        }

        throw new Error("Cannot create a binder on the input.");
    }

    protected getOutputEvent(): EventEmitter<PartialInputTypedBinder> {
        return this.inputBinder;
    }
}
