import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeysBinder} from 'interacto';

@Directive({
  selector: '[ioKeysPress]'
})
export class KeysPressBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
  }

  /**
   * Starts the creation of a binding using the keys pressed interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysPress(fn: (partialBinder: PartialKeysBinder | undefined) => void)  {
    const partialBinder = this.bindings.keysPressBinder().on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
