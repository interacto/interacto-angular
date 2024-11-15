import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialTouchSrcTgtTypedBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioPan]',
  standalone: true
})
export class PanBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTouchSrcTgtTypedBinder> {
  @Output()
  private readonly panBinder: EventEmitter<PartialTouchSrcTgtTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.panBinder = new EventEmitter<PartialTouchSrcTgtTypedBinder>();
  }

  /**
   * Defines whether the user can cancel the pan
   */
  @Input()
  cancellable = false;

  /**
   * Starts the creation of a binding using the pan interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioPan(fn: ((partialBinder: PartialTouchSrcTgtTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTouchSrcTgtTypedBinder {
    return this.bindings.panBinder(this.cancellable);
  }

  protected getOutputEvent(): EventEmitter<PartialTouchSrcTgtTypedBinder> {
    return this.panBinder;
  }
}
