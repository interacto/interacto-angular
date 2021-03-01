import {Directive, ElementRef, OnDestroy} from '@angular/core';
import {Bindings, Undo} from 'interacto';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[ioUndo]'
})
export class UndoBinderDirective implements OnDestroy {
  private readonly undoObs: Subscription;

  constructor(private element: ElementRef, private bindings: Bindings) {
    if (!(element.nativeElement instanceof HTMLButtonElement)) {
      throw new Error('The undo directive only applies on buttons');
    }

    this.undoObs = bindings.undoHistory
      .undosObservable()
      .subscribe(_ => {
        this.updateUndo();
      });

    this.updateUndo();

    bindings
      .buttonBinder()
      .on(element)
      .toProduce(() => new Undo(bindings.undoHistory))
      .bind();
  }

  private updateUndo(): void {
    this.element.nativeElement.disabled = this.bindings.undoHistory.getLastUndo() === undefined;
    this.element.nativeElement.title = this.bindings.undoHistory.getLastOrEmptyUndoMessage();
  }

  ngOnDestroy(): void {
    this.undoObs.unsubscribe();
  }
}
