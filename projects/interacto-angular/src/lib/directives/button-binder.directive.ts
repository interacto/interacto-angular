import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialButtonTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "button:[ioButton],[ioButton] [ioOnDynamic]",
    standalone: true
})
export class ButtonBinderDirective extends InteractoBinderDirective<HTMLButtonElement | HTMLElement, PartialButtonTypedBinder> {
    @Output()
    private readonly buttonBinder: EventEmitter<PartialButtonTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLButtonElement | HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.buttonBinder = new EventEmitter<PartialButtonTypedBinder>();
    }

    @Input()
    public set ioButton(fn: ((partialBinder: PartialButtonTypedBinder, widget: HTMLButtonElement | HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialButtonTypedBinder {
        return this.bindings.buttonBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialButtonTypedBinder> {
        return this.buttonBinder;
    }
}
