import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialTapBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioTap]'
})
export class TapBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * The number of taps expected to end the interaction.
   * If this number is not reached after a timeout, the interaction is cancelled.
   */
  @Input()
  nbTaps = 2;

  /**
   * Starts the creation of a binding using the tap interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioTap(fn: (partialBinder: PartialTapBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values
    const partialBinder = this.bindings.tapBinder(this.nbTaps).on(this.element);
    this.getComponent(fn.name)[fn.name](partialBinder);
  }
}
