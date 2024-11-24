import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialAnchorTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "a:[ioAnchor],[ioAnchor] [ioOnDynamic]",
    standalone: true
})
export class AnchorBinderDirective extends InteractoBinderDirective<HTMLAnchorElement, PartialAnchorTypedBinder> {
    @Output()
    private readonly aBinder: EventEmitter<PartialAnchorTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLAnchorElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.aBinder = new EventEmitter<PartialAnchorTypedBinder>();
    }

    @Input()
    public set ioAnchor(fn: ((partialBinder: PartialAnchorTypedBinder, widget: HTMLAnchorElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialAnchorTypedBinder {
        return this.bindings.hyperlinkBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialAnchorTypedBinder> {
        return this.aBinder;
    }
}
