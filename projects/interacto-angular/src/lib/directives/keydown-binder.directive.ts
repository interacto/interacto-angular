import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialKeyTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioKeydown]",
    standalone: true
})
export class KeydownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyTypedBinder> {
    @Output()
    private readonly keydownBinder: EventEmitter<PartialKeyTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.keydownBinder = new EventEmitter<PartialKeyTypedBinder>();
    }

    @Input()
    public modifierAccepted = true;

    /**
     * Starts the creation of a binding using the key pressure interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioKeydown(fn: ((partialBinder: PartialKeyTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialKeyTypedBinder {
        return this.bindings.keyDownBinder(this.modifierAccepted);
    }

    protected getOutputEvent(): EventEmitter<PartialKeyTypedBinder> {
        return this.keydownBinder;
    }
}
