import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointSrcTgtBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioDragLock]'
})
export class DragLockBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  /**
   * Starts the creation of a binding using the drag lock interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDragLock(fn: ((partialBinder: PartialPointSrcTgtBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointSrcTgtBinder {
    return this.onDyn ? this.bindings.dragLockBinder().onDynamic(this.element): this.bindings.dragLockBinder().on(this.element);
  }
}
