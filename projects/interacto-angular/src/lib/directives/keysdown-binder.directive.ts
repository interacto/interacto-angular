import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialKeysTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioKeysdown]",
    standalone: true
})
export class KeysdownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysTypedBinder> {
    @Output()
    private readonly keysdownBinder: EventEmitter<PartialKeysTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.keysdownBinder = new EventEmitter<PartialKeysTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the keys pressed interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioKeysdown(fn: ((partialBinder: PartialKeysTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialKeysTypedBinder {
        return this.bindings.keysDownBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialKeysTypedBinder> {
        return this.keysdownBinder;
    }
}
