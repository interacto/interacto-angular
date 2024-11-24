import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ChangeDetectorRef, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialPointTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioMouseleave]",
    standalone: true
})
export class MouseleaveBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointTypedBinder> {
    @Output()
    private readonly mouseleaveBinder: EventEmitter<PartialPointTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           changeDetectorRef: ChangeDetectorRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef, changeDetectorRef);
        this.mouseleaveBinder = new EventEmitter<PartialPointTypedBinder>();
    }

    /**
     * The expected number of clicks.
     */
    @Input()
    public bubbling: boolean | string = false;

    /**
     * Starts the creation of a binding using the mouse press interaction.
     * @param fn - The function of the component that will be called to configure the binding.
     */
    @Input()
    public set ioMouseleave(fn: ((partialBinder: PartialPointTypedBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialPointTypedBinder {
        const withbubbling = typeof this.bubbling === "boolean" ? this.bubbling : this.bubbling === "true";
        return this.bindings.mouseLeaveBinder(withbubbling);
    }

    protected getOutputEvent(): EventEmitter<PartialPointTypedBinder> {
        return this.mouseleaveBinder;
    }
}
