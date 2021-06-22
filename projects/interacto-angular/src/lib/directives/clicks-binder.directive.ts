import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointsBinder} from 'interacto';

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
  }

  /**
   * The expected number of clicks.
   */
  @Input()
  count = 2;

  /**
   * Starts the creation of a ClicksBinder.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClicks(fn:
                   (partialBinder: PartialPointsBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the value for count
    const partialBinder = this.bindings.clicksBinder(this.count).on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
