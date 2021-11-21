import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialUpdatePointBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioDoubleClick]'
})
export class DoubleClickBinderDirective extends InteractoBinderDirective<HTMLElement, PartialUpdatePointBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  /**
   * Starts the creation of a binding using the double-click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDoubleClick(fn: ((partialBinder: PartialUpdatePointBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialUpdatePointBinder {
    return this.onDyn ? this.bindings.dbleClickBinder().onDynamic(this.element): this.bindings.dbleClickBinder().on(this.element);
  }
}
