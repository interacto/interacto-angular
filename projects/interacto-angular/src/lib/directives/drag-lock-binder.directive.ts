import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointSrcTgtTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioDragLock]',
  standalone: true
})
export class DragLockBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtTypedBinder> {
  @Output()
  private readonly dragLockBinder: EventEmitter<PartialPointSrcTgtTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.dragLockBinder = new EventEmitter<PartialPointSrcTgtTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the drag lock interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDragLock(fn: ((partialBinder: PartialPointSrcTgtTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointSrcTgtTypedBinder {
    return this.bindings.dragLockBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointSrcTgtTypedBinder> {
    return this.dragLockBinder;
  }
}
