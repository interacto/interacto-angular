import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialMultiTouchBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioSwipe]'
})
export class SwipeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialMultiTouchBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings, changeDetectorRef);
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
   * The number of touches required to start the interaction
   */
  @Input()
  nbTouches = 1;

  /**
   * Starts the creation of a binding using the swipe interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioSwipe(fn: ((partialBinder: PartialMultiTouchBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialMultiTouchBinder {
    return this.onDyn ?
      this.bindings.swipeBinder(this.horizontal, this.minVelocity, this.minLength, this.nbTouches, this.pxTolerance).onDynamic(this.element):
      this.bindings.swipeBinder(this.horizontal, this.minVelocity, this.minLength, this.nbTouches, this.pxTolerance).on(this.element);
  }
}
