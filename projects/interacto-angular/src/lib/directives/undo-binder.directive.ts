import {InteractoBinderDirective} from "./interacto-binder-directive";
import {Directive, Input, AfterContentInit, ElementRef, EventEmitter, OnDestroy, ViewContainerRef} from "@angular/core";
import {Undo, Binding, Bindings, Command, Interaction, InteractionCmdBinder, UndoHistoryBase, WidgetData} from "interacto";
import {Subscription} from "rxjs";

export type PartialUndoButtonBinder = InteractionCmdBinder<Undo, Interaction<WidgetData<HTMLButtonElement>>, unknown, WidgetData<HTMLButtonElement>>;

@Directive({
    selector: "button:ioUndo,button:[ioUndo]",
    standalone: true
})
export class UndoBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialUndoButtonBinder>
    implements AfterContentInit, OnDestroy {

    private readonly undoObs: Subscription;

    public constructor(
        element: ElementRef<HTMLButtonElement>,
        viewContainerRef: ViewContainerRef,
        private readonly bindings: Bindings<UndoHistoryBase>) {
        super(undefined, element, viewContainerRef);
        this.undoObs = bindings.undoHistory
            .undosObservable()
            .subscribe(() => {
                this.updateUndo();
            });
    }

    @Input()
    public set ioUndo(fn: ((partialBinder: PartialUndoButtonBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    private updateUndo(): void {
        const elt = this.getElementContent();
        elt.disabled = this.bindings.undoHistory.getLastUndo() === undefined;
        elt.title = this.bindings.undoHistory.getLastOrEmptyUndoMessage();
    }

    public override ngAfterContentInit(): void {
        this.updateUndo();

        if (!this.inputSet) {
            const binding = this.createPartialBinder()
                .catch(err => {
                    console.log(err);
                })
                .bind();

            this.binding = [binding];
        }
    }

    protected createPartialBinder(): PartialUndoButtonBinder {
        return this.bindings
            .buttonBinder()
            .on(this.element)
            .toProduce(() => new Undo(this.bindings.undoHistory));
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.undoObs.unsubscribe();
    }

    protected getOutputEvent(): EventEmitter<PartialUndoButtonBinder> | undefined {
        return undefined;
    }
}
