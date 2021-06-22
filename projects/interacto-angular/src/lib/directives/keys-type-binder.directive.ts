import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeysBinder} from 'interacto';

@Directive({
  selector: '[ioKeysType]'
})
export class KeysTypeBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
  }

  /**
   * Starts the creation of a binding using the multiple key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysType(fn: (partialBinder: PartialKeysBinder | undefined) => void)  {
    const partialBinder = this.bindings.keysTypeBinder().on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
