import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeyBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeyType]'
})
export class KeyTypeBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeyType(fn: (partialBinder: PartialKeyBinder | undefined) => void)  {
    const partialBinder = this.bindings.keyTypeBinder().on(this.element);
    this.getComponent(fn.name)[fn.name][fn.name](partialBinder);
  }
}
