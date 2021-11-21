import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeysBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeysdown]'
})
export class KeysdownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  /**
   * Starts the creation of a binding using the keys pressed interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysdown(fn: ((partialBinder: PartialKeysBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeysBinder {
    return this.onDyn ? this.bindings.keysDownBinder().onDynamic(this.element): this.bindings.keysDownBinder().on(this.element);
  }
}
