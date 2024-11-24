import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, EventEmitter, Host, Input, Optional, Output, ElementRef, ViewContainerRef} from "@angular/core";
import {Binding, Bindings, Command, Interaction, PartialSelectTypedBinder, UndoHistoryBase} from "interacto";

@Directive({
    selector: "select:[ioSelect], [ioSelect] [ioOnDynamic]",
    standalone: true
})
export class SelectBinderDirective extends InteractoBinderDirective<HTMLSelectElement, PartialSelectTypedBinder> {
    @Output()
    private readonly selectBinder: EventEmitter<PartialSelectTypedBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
                                           element: ElementRef<HTMLSelectElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: Bindings<UndoHistoryBase>) {
        super(onDyn, element, viewContainerRef);
        this.selectBinder = new EventEmitter<PartialSelectTypedBinder>();
    }

    @Input()
    public set ioSelect(fn: ((partialBinder: PartialSelectTypedBinder, widget: HTMLSelectElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialSelectTypedBinder {
        return this.bindings.comboBoxBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialSelectTypedBinder> {
        return this.selectBinder;
    }
}
