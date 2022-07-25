import {AfterContentInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, Interaction, InteractionCmdBinder, Undo, UndoHistoryBase, WidgetData} from 'interacto';
import {Subscription} from 'rxjs';
import {InteractoBinderDirective} from './interacto-binder-directive';

export type PartialUndoButtonBinder = InteractionCmdBinder<Undo, Interaction<WidgetData<HTMLButtonElement>>, WidgetData<HTMLButtonElement>>;

@Directive({
  selector: 'button:ioUndo,button:[ioUndo]'
})
export class UndoBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialUndoButtonBinder>
  implements AfterContentInit, OnDestroy {

  private readonly undoObs: Subscription;

  public constructor(
    element: ElementRef<HTMLButtonElement>,
    viewContainerRef: ViewContainerRef,
    private bindings: Bindings<UndoHistoryBase>) {
    super(undefined, element, viewContainerRef);
    this.undoObs = bindings.undoHistory
      .undosObservable()
      .subscribe(_ => {
        this.updateUndo();
      });
  }

  @Input()
  public set ioUndo(fn: ((partialBinder: PartialUndoButtonBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string) {
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
      const b = this.createPartialBinder()
        .catch(err => {
          console.log(err);
        })
        .bind();

      this.binding = [b];
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
