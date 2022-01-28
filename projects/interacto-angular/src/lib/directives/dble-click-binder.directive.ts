import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialUpdatePointBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioDoubleClick]'
})
export class DoubleClickBinderDirective extends InteractoBinderDirective<HTMLElement, PartialUpdatePointBinder> {
  @Output()
  private readonly dbleclickBinder: EventEmitter<PartialUpdatePointBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.dbleclickBinder = new EventEmitter<PartialUpdatePointBinder>();
  }

  /**
   * Starts the creation of a binding using the double-click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDoubleClick(fn: ((partialBinder: PartialUpdatePointBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialUpdatePointBinder {
    return this.bindings.dbleClickBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialUpdatePointBinder> {
    return this.dbleclickBinder;
  }
}
