import {InteractoBinderDirective} from "./interacto-binder-directive";
import {OnDynamicDirective} from "./on-dynamic.directive";
import {AngularBindings, PartialMatSelectBinder} from "../base/angular-bindings";
import {Directive, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from "@angular/core";
import {MatSelect} from "@angular/material/select";
import {Binding, Command, Interaction, UndoHistoryBase} from "interacto";

@Directive({
    selector: "mat-select:[ioMatSelect],[ioMatSelect] [ioOnDynamic]",
    standalone: true
})
export class MatSelectBinderDirective extends InteractoBinderDirective<MatSelect, PartialMatSelectBinder> {
    @Output()
    private readonly matSelectBinder: EventEmitter<PartialMatSelectBinder>;

    public constructor(@Optional() @Host() onDyn: OnDynamicDirective,
        // element: ElementRef<HTMLElement>,
                                           viewContainerRef: ViewContainerRef,
                                           private readonly bindings: AngularBindings<UndoHistoryBase>,
        // The MatSelect component
                                           select: MatSelect) {
        super(onDyn, select, viewContainerRef);
        this.matSelectBinder = new EventEmitter<PartialMatSelectBinder>();
    }

    @Input()
    public set ioMatSelect(fn: ((partialBinder: PartialMatSelectBinder, widget: MatSelect) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    protected createPartialBinder(): PartialMatSelectBinder {
        return this.bindings.matSelectBinder();
    }

    protected getOutputEvent(): EventEmitter<PartialMatSelectBinder> {
        return this.matSelectBinder;
    }
}
