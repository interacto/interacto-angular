import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, UndoHistoryBase, type PartialPointsOrTapsTypedBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioClicksOrTaps]',
  standalone: true
})
export class ClickOrTapsBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointsOrTapsTypedBinder> {
  @Output()
  private readonly clicksOrTapsBinder: EventEmitter<PartialPointsOrTapsTypedBinder>;

  /**
   * The number of taps expected to end the interaction.
   * If this number is not reached after a timeout, the interaction is cancelled.
   */
  @Input()
  nbTaps = 2;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.clicksOrTapsBinder = new EventEmitter<PartialPointsOrTapsTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the taps or clicks interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClicksOrTaps(fn: ((partialBinder: PartialPointsOrTapsTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointsOrTapsTypedBinder {
    return this.bindings.tapsOrClicksBinder(this.nbTaps);
  }

  protected getOutputEvent(): EventEmitter<PartialPointsOrTapsTypedBinder> {
    return this.clicksOrTapsBinder;
  }
}
