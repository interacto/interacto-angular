import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialTapBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioTap]'
})
export class TapBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTapBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings, changeDetectorRef);
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
  set ioTap(fn: ((partialBinder: PartialTapBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTapBinder {
    return this.onDyn ? this.bindings.tapBinder(this.nbTaps).onDynamic(this.element):
      this.bindings.tapBinder(this.nbTaps).on(this.element);
  }
}
