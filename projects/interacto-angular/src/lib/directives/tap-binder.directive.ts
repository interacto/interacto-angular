import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Bindings, PartialTapBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioTap]'
})
export class TapBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTapBinder> {
  @Output()
  private readonly tapBinder: EventEmitter<PartialTapBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.tapBinder = new EventEmitter<PartialTapBinder>();
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
    return this.bindings.tapBinder(this.nbTaps);
  }

  protected getOutputEvent(): EventEmitter<PartialTapBinder> {
    return this.tapBinder;
  }
}
