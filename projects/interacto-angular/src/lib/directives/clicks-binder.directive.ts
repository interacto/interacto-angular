import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointsBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective extends InteractoBinderDirective {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * The expected number of clicks.
   */
  @Input()
  count = 2;

  /**
   * Starts the creation of a binding using the clicks interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClicks(fn: (partialBinder: PartialPointsBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.clicksBinder(this.count).onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.clicksBinder(this.count).on(this.element));
    }
  }
}
