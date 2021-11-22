import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialUpdatePointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioLongMousedown]'
})
export class LongMousedownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialUpdatePointBinder> {
  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
  }

  /**
   * The duration of the pressure to end the user interaction.
   * If this duration is not reached, the interaction is cancelled.
   */
  @Input()
  duration = 1000;

  /**
   * Starts the creation of a binding using the long press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioLongMousedown(fn: ((partialBinder: PartialUpdatePointBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialUpdatePointBinder {
    return this.bindings.longMouseDownBinder(this.duration);
  }
}
