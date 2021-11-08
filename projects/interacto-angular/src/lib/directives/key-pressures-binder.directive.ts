import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeysBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeysPress]'
})
export class KeysPressBinderDirective extends InteractoBinderDirective {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the keys pressed interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysPress(fn: (partialBinder: PartialKeysBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.keysDownBinder().onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.keysDownBinder().on(this.element));
    }
  }
}
