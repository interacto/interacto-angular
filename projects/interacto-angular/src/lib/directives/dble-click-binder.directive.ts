import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialUpdatePointBinder} from 'interacto';

@Directive({
  selector: '[ioDoubleClick]'
})
export class DoubleClickBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
  }

  /**
   * Starts the creation of a binding using the double-click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDoubleClick(fn: (partialBinder: PartialUpdatePointBinder | undefined) => void)  {
    const partialBinder = this.bindings.dbleClickBinder().on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
