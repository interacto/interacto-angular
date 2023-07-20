import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMousedown]'
})
export class MousedownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointBinder> {
  @Output()
  private readonly mousedownBinder: EventEmitter<PartialPointBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.mousedownBinder = new EventEmitter<PartialPointBinder>();
  }

  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMousedown(fn: ((partialBinder: PartialPointBinder, widget: HTMLElement) => Binding<any, any, any, unknown> | Array<Binding<any, any, any, unknown>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointBinder {
    return this.bindings.mouseDownBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointBinder> {
    return this.mousedownBinder;
  }
}
