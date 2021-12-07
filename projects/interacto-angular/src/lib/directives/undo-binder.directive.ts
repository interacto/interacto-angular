import {AfterContentInit, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, Interaction, InteractionCmdBinder, Undo, WidgetData} from 'interacto';
import {Subscription} from 'rxjs';
import {InteractoBinderDirective} from './interacto-binder-directive';

export type PartialUndoButtonBinder = InteractionCmdBinder<Undo, Interaction<WidgetData<HTMLButtonElement>>, WidgetData<HTMLButtonElement>>;

@Directive({
  selector: 'button:[ioUndo]'
})
export class UndoBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialUndoButtonBinder>
  implements AfterContentInit {

  private readonly undoObs: Subscription;

  public constructor(
    element: ElementRef<HTMLButtonElement>,
    viewContainerRef: ViewContainerRef,
    private bindings: Bindings) {
    super(undefined, element, viewContainerRef);
    this.undoObs = bindings.undoHistory
      .undosObservable()
      .subscribe(_ => {
        this.updateUndo();
      });
  }

  @Input()
  public set ioUndo(fn: ((partialBinder: PartialUndoButtonBinder, widget: HTMLElement) => void) | undefined | string) {
    this.callBinder(fn);
  }


  private updateUndo(): void {
    this.element.nativeElement.disabled = this.bindings.undoHistory.getLastUndo() === undefined;
    this.element.nativeElement.title = this.bindings.undoHistory.getLastOrEmptyUndoMessage();
  }

  public ngAfterContentInit(): void {
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

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.undoObs.unsubscribe();
  }
}
