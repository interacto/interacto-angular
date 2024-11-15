import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialTouchSrcTgtTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioSwipe]',
  standalone: true
})
export class SwipeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTouchSrcTgtTypedBinder> {
  @Output()
  private readonly swipeBinder: EventEmitter<PartialTouchSrcTgtTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.swipeBinder = new EventEmitter<PartialTouchSrcTgtTypedBinder>();
  }

  /**
   * Defines whether the user can cancel the swipe
   */
  @Input()
  cancellable = false;

  /**
   * Defines whether the swipe is horizontal or vertical
   */
  @Input()
  horizontal = true;

  /**
   * The minimal minVelocity to reach for validating the swipe. In pixels per second.
   */
  @Input()
  minVelocity = 100;

  /**
   * The minimal distance from the starting point to the release point for validating the swipe
   */
  @Input()
  minLength = 100;

  /**
   * The tolerance rate in pixels accepted while executing the swipe
   */
  @Input()
  pxTolerance = 20;

  /**
   * Starts the creation of a binding using the swipe interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioSwipe(fn: ((partialBinder: PartialTouchSrcTgtTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTouchSrcTgtTypedBinder {
    if(this.horizontal) {
      return this.bindings.panHorizontalBinder(this.pxTolerance, this.cancellable, this.minLength, this.minVelocity);
    }
    return this.bindings.panVerticalBinder(this.pxTolerance, this.cancellable, this.minLength, this.minVelocity);
  }

  protected getOutputEvent(): EventEmitter<PartialTouchSrcTgtTypedBinder> {
    return this.swipeBinder;
  }
}
