import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointsBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointsBinder> {
  @Output()
  private readonly clicksBinder: EventEmitter<PartialPointsBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.clicksBinder = new EventEmitter<PartialPointsBinder>();
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
  set ioClicks(fn: ((partialBinder: PartialPointsBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointsBinder {
    let countValue = typeof this.count === 'number' ? this.count : parseInt(this.count, 0);

    if(isNaN(countValue)) {
      console.log('Cannot create a clicks binder since the value of number is ' +
        'not a number (in string or number format). So using the default value: 2');
      countValue = 2;
    }

    return this.bindings.clicksBinder(countValue);
  }

  protected getOutputEvent(): EventEmitter<PartialPointsBinder> {
    return this.clicksBinder;
  }
}
