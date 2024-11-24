import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialKeysTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioKeysType]",
    standalone: true
})
export class KeysTypeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysTypedBinder> {
    @Output()
    private readonly keysTypeBinder: EventEmitter<PartialKeysTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.keysTypeBinder = new EventEmitter<PartialKeysTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the multiple key typing interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioKeysType(fn: ((partialBinder: PartialKeysTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialKeysTypedBinder {
        return this.bindings.keysTypeBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialKeysTypedBinder> {
        return this.keysTypeBinder;
    }
}
