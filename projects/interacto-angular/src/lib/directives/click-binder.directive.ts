import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioClick]'
})
export class ClickBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClick(fn: (partialBinder: PartialPointBinder | undefined) => void)  {
    this.getComponent(fn.name)[fn.name](this.bindings.clickBinder().on(this.element));
  }
}
