import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMouseup]',
  standalone: true
})
export class MouseupBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointTypedBinder> {
  @Output()
  private readonly mouseupBinder: EventEmitter<PartialPointTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.mouseupBinder = new EventEmitter<PartialPointTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMouseup(fn: ((partialBinder: PartialPointTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointTypedBinder {
    return this.bindings.mouseUpBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointTypedBinder> {
    return this.mouseupBinder;
  }
}
