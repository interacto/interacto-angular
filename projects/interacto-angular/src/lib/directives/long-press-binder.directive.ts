import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialUpdatePointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioLongPress]'
})
export class LongPressBinderDirective extends InteractoBinderDirective {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
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
  set ioLongPress(fn: (partialBinder: PartialUpdatePointBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.longMouseDownBinder(this.duration).onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.longMouseDownBinder(this.duration).on(this.element));
    }
  }
}
