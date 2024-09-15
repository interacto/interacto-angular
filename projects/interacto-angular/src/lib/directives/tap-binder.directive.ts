import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialTapTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioTap]'
})
export class TapBinderDirective extends InteractoBinderDirective<HTMLElement, PartialTapTypedBinder> {
  @Output()
  private readonly tapBinder: EventEmitter<PartialTapTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.tapBinder = new EventEmitter<PartialTapTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the tap interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioTap(fn: ((partialBinder: PartialTapTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTapTypedBinder {
    return this.bindings.tapBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialTapTypedBinder> {
    return this.tapBinder;
  }
}
