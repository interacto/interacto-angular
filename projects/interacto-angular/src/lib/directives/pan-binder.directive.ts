import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialMultiTouchBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioPan]'
})
export class PanBinderDirective extends InteractoBinderDirective<HTMLElement, PartialMultiTouchBinder> {
  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
  }

  /**
   * Defines whether the pan is horizontal or vertical
   */
  @Input()
  horizontal = true;

  /**
   * The minimal distance from the starting point to the release point for validating the pan
   */
  @Input()
  minLength = 100;

  /**
   * The tolerance rate in pixels accepted while executing the pan
   */
  @Input()
  pxTolerance = 20;

  /**
   * The number of touches required to start the interaction
   */
  @Input()
  nbTouches = 1;

  /**
   * Starts the creation of a binding using the pan interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioPan(fn: ((partialBinder: PartialMultiTouchBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialMultiTouchBinder {
    return this.bindings.panBinder(this.horizontal, this.minLength, this.nbTouches, this.pxTolerance);
  }
}
