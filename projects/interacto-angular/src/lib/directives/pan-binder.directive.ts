import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialTouchSrcTgtBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioPan]'
})
export class PanBinderDirective extends InteractoBinderDirective {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
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
  set ioPan(fn: (partialBinder: PartialTouchSrcTgtBinder | undefined) => void)  {
    const fnName = this.checkFnName(fn);
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](
        this.bindings.panBinder(this.horizontal, this.minLength, this.nbTouches, this.pxTolerance).onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](
        this.bindings.panBinder(this.horizontal, this.minLength, this.nbTouches, this.pxTolerance).on(this.element));
    }
  }
}
