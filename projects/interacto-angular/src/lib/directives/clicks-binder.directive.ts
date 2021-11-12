import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointsBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective extends InteractoBinderDirective<HTMLElement> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
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
  set ioClicks(fn: (partialBinder: PartialPointsBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values

    let countValue = typeof this.count === 'number' ? this.count : parseInt(this.count, 0);

    if(isNaN(countValue)) {
      console.log('Cannot create a clicks binder since the value of number is ' +
        'not a number (in string or number format). So using the default value: 2');
      countValue = 2;
    }

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.clicksBinder(countValue).onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.clicksBinder(countValue).on(this.element));
    }
  }
}
