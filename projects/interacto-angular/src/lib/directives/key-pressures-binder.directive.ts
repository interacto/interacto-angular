import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeysBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeysPress]'
})
export class KeysPressBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the keys pressed interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysPress(fn: (partialBinder: PartialKeysBinder | undefined) => void)  {
    const partialBinder = this.bindings.keysPressBinder().on(this.element);
    this.getComponent(fn.name)[fn.name][fn.name](partialBinder);
  }
}
