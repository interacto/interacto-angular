import {Directive, ElementRef, OnDestroy} from '@angular/core';
import {Bindings, Redo} from 'interacto';
import {Subscription} from 'rxjs';

@Directive({
  selector: 'button:[ioRedo]'
})
export class RedoBinderDirective implements OnDestroy {
  private readonly redoObs: Subscription;

  constructor(private element: ElementRef<HTMLButtonElement>, private bindings: Bindings) {
    // if (!(element.nativeElement instanceof HTMLButtonElement)) {
    //   throw new Error('The redo directive only applies on buttons');
    // }

    this.redoObs = bindings.undoHistory
      .redosObservable()
      .subscribe(_ => {
        this.updateRedo();
      });

    this.updateRedo();

    bindings
      .buttonBinder()
      .on(element)
      .toProduce(() => new Redo(bindings.undoHistory))
      .bind();
  }

  private updateRedo(): void {
    this.element.nativeElement.disabled = this.bindings.undoHistory.getLastRedo() === undefined;
    this.element.nativeElement.title = this.bindings.undoHistory.getLastOrEmptyRedoMessage();
  }

  ngOnDestroy(): void {
    this.redoObs.unsubscribe();
  }
}
