import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialUpdatePointTypedBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioDoubleClick]'
})
export class DoubleClickBinderDirective extends InteractoBinderDirective<HTMLElement, PartialUpdatePointTypedBinder> {
  @Output()
  private readonly dbleclickBinder: EventEmitter<PartialUpdatePointTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.dbleclickBinder = new EventEmitter<PartialUpdatePointTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the double-click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDoubleClick(fn: ((partialBinder: PartialUpdatePointTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialUpdatePointTypedBinder {
    return this.bindings.dbleClickBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialUpdatePointTypedBinder> {
    return this.dbleclickBinder;
  }
}
