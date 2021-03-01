import {Directive, ElementRef} from '@angular/core';
import {Bindings, Undo} from 'interacto';

@Directive({
  selector: '[ioUndo]'
})
export class UndoBinderDirective {
  constructor(element: ElementRef, bindings: Bindings) {
    bindings
      .buttonBinder()
      .on(element)
      .toProduce(() => new Undo(bindings.undoHistory))
      .bind();
  }
}
