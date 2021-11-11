import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialUpdatePointBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioDoubleClick]'
})
export class DoubleClickBinderDirective extends InteractoBinderDirective<HTMLElement> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the double-click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDoubleClick(fn: (partialBinder: PartialUpdatePointBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.dbleClickBinder().onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.dbleClickBinder().on(this.element));
    }
  }
}
