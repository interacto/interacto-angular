import {InteractoBinderDirective} from "./interacto-binder-directive";
import {Directive, Input, AfterContentInit, ElementRef, EventEmitter, OnDestroy, ViewContainerRef} from "@angular/core";
import {Redo, Binding, Bindings, Command, Interaction, InteractionCmdBinder, UndoHistoryBase, WidgetData} from "interacto";
import {Subscription} from "rxjs";

export type PartialRedoButtonBinder = InteractionCmdBinder<Redo, Interaction<WidgetData<HTMLButtonElement>>, unknown, WidgetData<HTMLButtonElement>>;

@Directive({
    selector: "button:ioRedo,button:[ioRedo]",
    standalone: true
})
export class RedoBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialRedoButtonBinder>
    implements AfterContentInit, OnDestroy {
    private readonly redoObs: Subscription;

    public constructor(
        element: ElementRef<HTMLButtonElement>,
        viewContainerRef: ViewContainerRef,
        private readonly bindings: Bindings<UndoHistoryBase>) {
        super(undefined, element, viewContainerRef);
        this.redoObs = bindings.undoHistory
            .redosObservable()
            .subscribe(() => {
                this.updateRedo();
            });
    }

    @Input()
    public set ioRedo(fn: ((partialBinder: PartialRedoButtonBinder, widget: HTMLElement) =>
      Binding<Command, Interaction<object>, unknown> | Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string) {
        this.callBinder(fn);
    }

    private updateRedo(): void {
        const elt = this.getElementContent();
        elt.disabled = this.bindings.undoHistory.getLastRedo() === undefined;
        elt.title = this.bindings.undoHistory.getLastOrEmptyRedoMessage();
    }

    public override ngAfterContentInit(): void {
        this.updateRedo();

        if (!this.inputSet) {
            const bind = this.createPartialBinder()
                .catch(err => {
                    console.log(err);
                })
                .bind();

            this.binding = [bind];
        }
    }

    protected createPartialBinder(): PartialRedoButtonBinder {
        return this.bindings
            .buttonBinder()
            .on(this.element)
            .toProduce(() => new Redo(this.bindings.undoHistory));
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.redoObs.unsubscribe();
    }

    protected getOutputEvent(): EventEmitter<PartialRedoButtonBinder> | undefined {
        return undefined;
    }
}
