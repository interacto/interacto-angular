import {Directive, ElementRef} from '@angular/core';
import {Bindings, Redo} from 'interacto';

@Directive({
  selector: '[ioRedo]'
})
export class RedoBinderDirective {
  constructor(element: ElementRef, bindings: Bindings) {
    bindings
      .buttonBinder()
      .on(element)
      .toProduce(() => new Redo(bindings.undoHistory))
      .bind();
  }
}
