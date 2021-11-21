import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMouseup]'
})
export class MouseupBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMouseup(fn: ((partialBinder: PartialPointBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointBinder {
    return this.onDyn ? this.bindings.mouseUpBinder().onDynamic(this.element): this.bindings.mouseUpBinder().on(this.element);
  }
}
