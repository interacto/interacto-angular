import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointsBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointsBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings, changeDetectorRef);
  }

  /**
   * The expected number of clicks.
   */
  @Input()
  count: number | string = 2;

  /**
   * Starts the creation of a binding using the clicks interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClicks(fn: ((partialBinder: PartialPointsBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointsBinder {
    let countValue = typeof this.count === 'number' ? this.count : parseInt(this.count, 0);

    if(isNaN(countValue)) {
      console.log('Cannot create a clicks binder since the value of number is ' +
        'not a number (in string or number format). So using the default value: 2');
      countValue = 2;
    }

    return this.onDyn ? this.bindings.clicksBinder(countValue).onDynamic(this.element):
      this.bindings.clicksBinder(countValue).on(this.element);
  }
}
