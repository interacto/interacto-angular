import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, UndoHistoryBase, type PartialPointOrTouchTypedBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioClickOrTap]'
})
export class ClickOrTapBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointOrTouchTypedBinder> {
  @Output()
  private readonly clickOrTapBinder: EventEmitter<PartialPointOrTouchTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.clickOrTapBinder = new EventEmitter<PartialPointOrTouchTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the tap or click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClickOrTap(fn: ((partialBinder: PartialPointOrTouchTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointOrTouchTypedBinder {
    return this.bindings.tapOrClickBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointOrTouchTypedBinder> {
    return this.clickOrTapBinder;
  }
}
