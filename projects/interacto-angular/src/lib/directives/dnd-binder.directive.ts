import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointSrcTgtBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioDnd]'
})
export class DndBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtBinder> {
  @Output()
  private readonly dndBinder: EventEmitter<PartialPointSrcTgtBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.dndBinder = new EventEmitter<PartialPointSrcTgtBinder>();
  }

  @Input()
  cancellable = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDnd(fn: ((partialBinder: PartialPointSrcTgtBinder, widget: HTMLElement) => Binding<any, any, any, unknown> | Array<Binding<any, any, any, unknown>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointSrcTgtBinder {
    return this.bindings.dndBinder(this.cancellable);
  }

  protected getOutputEvent(): EventEmitter<PartialPointSrcTgtBinder> {
    return this.dndBinder;
  }
}
