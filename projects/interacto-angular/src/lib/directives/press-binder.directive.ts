import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioPress]'
})
export class PressBinderDirective extends InteractoBinderDirective {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioPress(fn: (partialBinder: PartialPointBinder | undefined) => void)  {
    const fnName = this.checkFnName(fn);

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.mouseDownBinder().onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.mouseDownBinder().on(this.element));
    }
  }
}
