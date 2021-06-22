import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialTouchBinder} from 'interacto';

@Directive({
  selector: '[ioLongTouch]'
})
export class LongTouchBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
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
  set ioLongTouch(fn: (partialBinder: PartialTouchBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values
    const partialBinder = this.bindings.longTouchBinder(this.duration).on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
