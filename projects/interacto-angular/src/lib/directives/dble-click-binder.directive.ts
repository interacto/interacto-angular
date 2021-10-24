import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialUpdatePointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioDoubleClick]'
})
export class DoubleClickBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the double-click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDoubleClick(fn: (partialBinder: PartialUpdatePointBinder | undefined) => void)  {
    this.getComponent(fn.name)[fn.name](this.bindings.dbleClickBinder().on(this.element));
  }
}
