import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialTouchSrcTgtBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioSwipe]'
})
export class SwipeBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Defines whether the swipe is horizontal or vertical
   */
  @Input()
  horizontal = true;

  /**
   * The minimal minVelocity to reach for validating the swipe. In pixels per second.
   */
  @Input()
  minVelocity = 100;

  /**
   * The minimal distance from the starting point to the release point for validating the swipe
   */
  @Input()
  minLength = 100;

  /**
   * The tolerance rate in pixels accepted while executing the swipe
   */
  @Input()
  pxTolerance = 20;

  /**
   * Starts the creation of a binding using the swipe interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioSwipe(fn: (partialBinder: PartialTouchSrcTgtBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values
    const partialBinder = this.bindings.swipeBinder(this.horizontal, this.minVelocity, this.minLength, this.pxTolerance).on(this.element);
    this.getComponent(fn.name)[fn.name](partialBinder);
  }
}
