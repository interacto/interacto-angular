import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialKeyTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioKeyType]",
    standalone: true
})
export class KeyTypeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyTypedBinder> {
    @Output()
    private readonly keyTypeBinder: EventEmitter<PartialKeyTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.keyTypeBinder = new EventEmitter<PartialKeyTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the key typing interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioKeyType(fn: ((partialBinder: PartialKeyTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialKeyTypedBinder {
        return this.bindings.keyTypeBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialKeyTypedBinder> {
        return this.keyTypeBinder;
    }
}
