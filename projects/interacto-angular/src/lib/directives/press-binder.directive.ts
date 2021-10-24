import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioPress]'
})
export class PressBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioPress(fn: (partialBinder: PartialPointBinder | undefined) => void)  {
    const partialBinder = this.bindings.pressBinder().on(this.element);
    this.getComponent(fn.name)[fn.name][fn.name](partialBinder);
  }
}
