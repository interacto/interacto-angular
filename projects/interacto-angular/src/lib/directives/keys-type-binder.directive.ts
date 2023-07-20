import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeysBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioKeysType]'
})
export class KeysTypeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysBinder> {
  @Output()
  private readonly keysTypeBinder: EventEmitter<PartialKeysBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.keysTypeBinder = new EventEmitter<PartialKeysBinder>();
  }

  /**
   * Starts the creation of a binding using the multiple key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysType(fn: ((partialBinder: PartialKeysBinder, widget: HTMLElement) => Binding<any, any, any, unknown> | Array<Binding<any, any, any, unknown>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeysBinder {
    return this.bindings.keysTypeBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialKeysBinder> {
    return this.keysTypeBinder;
  }
}
