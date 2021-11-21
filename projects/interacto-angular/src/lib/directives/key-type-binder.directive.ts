import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeyBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioKeyType]'
})
export class KeyTypeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  /**
   * Starts the creation of a binding using the key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeyType(fn: ((partialBinder: PartialKeyBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeyBinder {
    return this.onDyn ? this.bindings.keyTypeBinder().onDynamic(this.element): this.bindings.keyTypeBinder().on(this.element);
  }
}
