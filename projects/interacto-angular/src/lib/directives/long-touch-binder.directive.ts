import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialTouchBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioLongTouch]'
})
export class LongTouchBinderDirective extends InteractoBinderDirective<HTMLElement> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * The duration of the touch to end the user interaction.
   * If this duration is not reached, the interaction is cancelled.
   */
  @Input()
  duration = 1000;

  /**
   * Starts the creation of a binding using the long touch interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioLongTouch(fn: (partialBinder: PartialTouchBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.longTouchBinder(this.duration).onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.longTouchBinder(this.duration).on(this.element));
    }
  }
}
