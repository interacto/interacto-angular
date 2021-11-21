import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeysBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioKeysType]'
})
export class KeysTypeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  /**
   * Starts the creation of a binding using the multiple key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysType(fn: ((partialBinder: PartialKeysBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeysBinder {
    return this.onDyn ? this.bindings.keysTypeBinder().onDynamic(this.element): this.bindings.keysTypeBinder().on(this.element);
  }
}
