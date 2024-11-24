import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, AfterContentInit, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialPointTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioClick]",
    standalone: true
})
export class ClickBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointTypedBinder> implements AfterContentInit {
    @Output()
    private readonly clickBinder: EventEmitter<PartialPointTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.clickBinder = new EventEmitter<PartialPointTypedBinder>();
    }

    /**
     * Starts the creation of a binding using the click interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioClick(fn: ((partialBinder: PartialPointTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialPointTypedBinder {
        return this.bindings.clickBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialPointTypedBinder> {
        return this.clickBinder;
    }
}
