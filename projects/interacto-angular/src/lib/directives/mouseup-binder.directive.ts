import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMouseup]'
})
export class MouseupBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointBinder> {
  @Output()
  private readonly mouseupBinder: EventEmitter<PartialPointBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.mouseupBinder = new EventEmitter<PartialPointBinder>();
  }

  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMouseup(fn: ((partialBinder: PartialPointBinder, widget: HTMLElement) => Binding<any, any, any, unknown> | Array<Binding<any, any, any, unknown>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointBinder {
    return this.bindings.mouseUpBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointBinder> {
    return this.mouseupBinder;
  }
}
