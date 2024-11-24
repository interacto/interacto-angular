import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, UndoHistoryBase, PartialTextInputTypedBinder} from "interacto";

@Directive({
    selector: "textarea:[ioTextarea], [ioTextarea] [ioOnDynamic]",
    standalone: true
})
export class TextAreaBinderDirective extends InteractoBinderDirective<HTMLTextAreaElement, PartialTextInputTypedBinder> {
    @Output()
    private readonly textareaBinder: EventEmitter<PartialTextInputTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLTextAreaElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.textareaBinder = new EventEmitter<PartialTextInputTypedBinder>();
    }

    @Input()
    public set ioTextarea(fn: ((partialBinder: PartialTextInputTypedBinder, widget: HTMLTextAreaElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialTextInputTypedBinder {
        return this.bindings.textInputBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialTextInputTypedBinder> {
        return this.textareaBinder;
    }
}
