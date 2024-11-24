import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, UndoHistoryBase, PartialTextInputTypedBinder} from "interacto";

@Directive({
    selector: "input:[ioTextinput][type=text], [ioTextinput] [ioOnDynamic]",
    standalone: true
})
export class TextInputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialTextInputTypedBinder> {
    @Output()
    private readonly textinputBinder: EventEmitter<PartialTextInputTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLInputElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.textinputBinder = new EventEmitter<PartialTextInputTypedBinder>();
    }

    @Input()
    public set ioTextinput(fn: ((partialBinder: PartialTextInputTypedBinder, widget: HTMLInputElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialTextInputTypedBinder {
        return this.bindings.textInputBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialTextInputTypedBinder> {
        return this.textinputBinder;
    }
}
