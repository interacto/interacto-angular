import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialTouchTypedBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioLongTouch]',
  standalone: true
})
export class LongTouchBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTouchTypedBinder> {
  @Output()
  private readonly longTouchBinder: EventEmitter<PartialTouchTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.longTouchBinder = new EventEmitter<PartialTouchTypedBinder>();
  }

  /**
   * The duration of the touch to end the user interaction.
   * If this duration is not reached, the interaction is cancelled.
   */
  @Input()
  duration = 1000;

  /**
   * Starts the creation of a binding using the long touch interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioLongTouch(fn: ((partialBinder: PartialTouchTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTouchTypedBinder {
    return this.bindings.longTouchBinder(this.duration);
  }

  protected getOutputEvent(): EventEmitter<PartialTouchTypedBinder> {
    return this.longTouchBinder;
  }
}
