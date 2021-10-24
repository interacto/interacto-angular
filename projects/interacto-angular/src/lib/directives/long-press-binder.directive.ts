import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialUpdatePointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioLongPress]'
})
export class LongPressBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef,
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
  set ioLongPress(fn: (partialBinder: PartialUpdatePointBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values
    const partialBinder = this.bindings.longPressBinder(this.duration).on(this.element);
    this.getComponent(fn.name)[fn.name](partialBinder);
  }
}
