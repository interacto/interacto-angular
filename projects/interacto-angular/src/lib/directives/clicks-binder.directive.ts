import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointsTypedBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioClicks]',
  standalone: true
})
export class ClicksBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointsTypedBinder> {
  @Output()
  private readonly clicksBinder: EventEmitter<PartialPointsTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.clicksBinder = new EventEmitter<PartialPointsTypedBinder>();
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
  set ioClicks(fn: ((partialBinder: PartialPointsTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointsTypedBinder {
    let countValue = typeof this.count === 'number' ? this.count : parseInt(this.count, 0);

    if(isNaN(countValue)) {
      console.log('Cannot create a clicks binder since the value of number is ' +
        'not a number (in string or number format). So using the default value: 2');
      countValue = 2;
    }

    return this.bindings.clicksBinder(countValue);
  }

  protected getOutputEvent(): EventEmitter<PartialPointsTypedBinder> {
    return this.clicksBinder;
  }
}
