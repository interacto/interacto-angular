import {AfterContentInit, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioClick]'
})
export class ClickBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointTypedBinder> implements AfterContentInit {
  @Output()
  private readonly clickBinder: EventEmitter<PartialPointTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.clickBinder = new EventEmitter<PartialPointTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  public set ioClick(fn: ((partialBinder: PartialPointTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointTypedBinder {
    return this.bindings.clickBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialPointTypedBinder> {
    return this.clickBinder;
  }
}
