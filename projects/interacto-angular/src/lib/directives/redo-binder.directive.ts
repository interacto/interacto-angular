import {AfterContentInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, Interaction, InteractionCmdBinder, Redo, UndoHistoryBase, WidgetData} from 'interacto';
import {Subscription} from 'rxjs';
import {InteractoBinderDirective} from './interacto-binder-directive';

export type PartialRedoButtonBinder = InteractionCmdBinder<Redo, Interaction<WidgetData<HTMLButtonElement>>, WidgetData<HTMLButtonElement>>;

@Directive({
  selector: 'button:ioRedo,button:[ioRedo]'
})
export class RedoBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialRedoButtonBinder>
  implements AfterContentInit, OnDestroy {
  private readonly redoObs: Subscription;

  public constructor(
    element: ElementRef<HTMLButtonElement>,
    viewContainerRef: ViewContainerRef,
    private bindings: Bindings<UndoHistoryBase>) {
    super(undefined, element, viewContainerRef);
    this.redoObs = bindings.undoHistory
      .redosObservable()
      .subscribe(_ => {
        this.updateRedo();
      });
  }

  @Input()
  public set ioRedo(fn: ((partialBinder: PartialRedoButtonBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string) {
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
      const b = this.createPartialBinder()
        .catch(err => {
          console.log(err);
        })
        .bind();

      this.binding = [b];
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
