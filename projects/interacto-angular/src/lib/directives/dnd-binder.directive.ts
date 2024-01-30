import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointSrcTgtTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioDnd]'
})
export class DndBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtTypedBinder> {
  @Output()
  private readonly dndBinder: EventEmitter<PartialPointSrcTgtTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.dndBinder = new EventEmitter<PartialPointSrcTgtTypedBinder>();
  }

  @Input()
  cancellable = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDnd(fn: ((partialBinder: PartialPointSrcTgtTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointSrcTgtTypedBinder {
    return this.bindings.dndBinder(this.cancellable);
  }

  protected getOutputEvent(): EventEmitter<PartialPointSrcTgtTypedBinder> {
    return this.dndBinder;
  }
}
