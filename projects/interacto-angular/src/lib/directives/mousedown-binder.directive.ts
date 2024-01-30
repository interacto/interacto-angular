import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMousedown]'
})
export class MousedownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointTypedBinder> {
  @Output()
  private readonly mousedownBinder: EventEmitter<PartialPointTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.mousedownBinder = new EventEmitter<PartialPointTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMousedown(fn: ((partialBinder: PartialPointTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointTypedBinder {
    return this.bindings.mouseDownBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointTypedBinder> {
    return this.mousedownBinder;
  }
}
