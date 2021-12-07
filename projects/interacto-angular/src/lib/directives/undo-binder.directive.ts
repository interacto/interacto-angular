import {Directive, ElementRef, OnDestroy} from '@angular/core';
import {Binding, Bindings, Command, Interaction, InteractionData, Undo} from 'interacto';
import {Subscription} from 'rxjs';

@Directive({
  selector: 'button:[ioUndo]'
})
export class UndoBinderDirective implements OnDestroy {
  private readonly undoObs: Subscription;

  private binding: Binding<Command, Interaction<InteractionData>, InteractionData>;

  constructor(private element: ElementRef<HTMLButtonElement>, private bindings: Bindings) {
    this.undoObs = bindings.undoHistory
      .undosObservable()
      .subscribe(_ => {
        this.updateUndo();
      });

    this.updateUndo();

    this.binding = bindings
      .buttonBinder()
      .on(element)
      .toProduce(() => new Undo(bindings.undoHistory))
      .catch(err => {
        console.log(err);
      })
      .bind();
  }

  private updateUndo(): void {
    this.element.nativeElement.disabled = this.bindings.undoHistory.getLastUndo() === undefined;
    this.element.nativeElement.title = this.bindings.undoHistory.getLastOrEmptyUndoMessage();
  }

  ngOnDestroy(): void {
    this.undoObs.unsubscribe();
    this.binding.uninstallBinding();
  }
}
