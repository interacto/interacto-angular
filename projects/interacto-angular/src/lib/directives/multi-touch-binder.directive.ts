import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialMultiTouchBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMultiTouch]'
})
export class MultiTouchBinderDirective extends InteractoBinderDirective<HTMLElement, PartialMultiTouchBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings, changeDetectorRef);
  }

  /**
   * The number of required touches.
   * A multi-touch starts when all its touches have started.
   * A multi-touch ends when the number of required touches is greater than the number of touches.
   */
  @Input()
  nbTouches = 2;

  /**
   * Starts the creation of a binding using the multi touch interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMultiTouch(fn: ((partialBinder: PartialMultiTouchBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialMultiTouchBinder {
    return this.onDyn ? this.bindings.multiTouchBinder(this.nbTouches).onDynamic(this.element):
      this.bindings.multiTouchBinder(this.nbTouches).on(this.element);
  }
}
