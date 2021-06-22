import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeyBinder} from 'interacto';

@Directive({
  selector: '[ioKeyType]'
})
export class KeyTypeBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
  }

  /**
   * Starts the creation of a binding using the key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeyType(fn: (partialBinder: PartialKeyBinder | undefined) => void)  {
    const partialBinder = this.bindings.keyTypeBinder().on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
