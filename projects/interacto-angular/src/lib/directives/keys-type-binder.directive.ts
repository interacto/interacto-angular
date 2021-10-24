import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeysBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeysType]'
})
export class KeysTypeBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the multiple key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysType(fn: (partialBinder: PartialKeysBinder | undefined) => void)  {
    const partialBinder = this.bindings.keysTypeBinder().on(this.element);
    this.getComponent(fn.name)[fn.name][fn.name](partialBinder);
  }
}
