import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialMultiTouchTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMultiTouch]',
  standalone: true
})
export class MultiTouchBinderDirective extends InteractoBinderDirective<HTMLElement, PartialMultiTouchTypedBinder> {
  @Output()
  private readonly multiTouchBinder: EventEmitter<PartialMultiTouchTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.multiTouchBinder = new EventEmitter<PartialMultiTouchTypedBinder>();
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
  set ioMultiTouch(fn: ((partialBinder: PartialMultiTouchTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialMultiTouchTypedBinder {
    return this.bindings.multiTouchBinder(this.nbTouches);
  }

  protected getOutputEvent(): EventEmitter<PartialMultiTouchTypedBinder> {
    return this.multiTouchBinder;
  }
}
