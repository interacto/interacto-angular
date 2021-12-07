import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointSrcTgtBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioDragLock]'
})
export class DragLockBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtBinder> {
  @Output()
  private readonly dragLockBinder: EventEmitter<PartialPointSrcTgtBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
    this.dragLockBinder = new EventEmitter<PartialPointSrcTgtBinder>();
  }

  /**
   * Starts the creation of a binding using the drag lock interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDragLock(fn: ((partialBinder: PartialPointSrcTgtBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointSrcTgtBinder {
    return this.bindings.dragLockBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointSrcTgtBinder> {
    return this.dragLockBinder;
  }
}
