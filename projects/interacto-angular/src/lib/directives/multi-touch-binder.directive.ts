import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialMultiTouchBinder} from 'interacto';

@Directive({
  selector: '[ioMultiTouch]'
})
export class MultiTouchBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
  }

  /**
   * The number of required touches.
   * A multi-touch starts when all its touches have started.
   * A multi-touch ends when the number of required touches is greater than the number of touches.
   */
  @Input()
  nbTouches = 2;

  /**
   * Starts the creation of a binding using the multi touch interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMultiTouch(fn: (partialBinder: PartialMultiTouchBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values
    const partialBinder = this.bindings.multiTouchBinder(this.nbTouches).on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
