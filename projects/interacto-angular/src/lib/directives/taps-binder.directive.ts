import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialTapsTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioTaps]',
  standalone: true
})
export class TapsBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTapsTypedBinder> {
  @Output()
  private readonly tapsBinder: EventEmitter<PartialTapsTypedBinder>;

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
    this.tapsBinder = new EventEmitter<PartialTapsTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the taps interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioTaps(fn: ((partialBinder: PartialTapsTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTapsTypedBinder {
    return this.bindings.tapsBinder(this.nbTaps);
  }

  protected getOutputEvent(): EventEmitter<PartialTapsTypedBinder> {
    return this.tapsBinder;
  }
}
