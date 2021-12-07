import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialTouchBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioLongTouch]'
})
export class LongTouchBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTouchBinder> {
  @Output()
  private readonly longTouchBinder: EventEmitter<PartialTouchBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.longTouchBinder = new EventEmitter<PartialTouchBinder>();
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
  set ioLongTouch(fn: ((partialBinder: PartialTouchBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTouchBinder {
    return this.bindings.longTouchBinder(this.duration);
  }

  protected getOutputEvent(): EventEmitter<PartialTouchBinder> {
    return this.longTouchBinder;
  }
}
