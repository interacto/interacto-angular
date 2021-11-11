import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeyBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioKeyType]'
})
export class KeyTypeBinderDirective extends InteractoBinderDirective<HTMLElement> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeyType(fn: (partialBinder: PartialKeyBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.keyTypeBinder().onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.keyTypeBinder().on(this.element));
    }
  }
}
