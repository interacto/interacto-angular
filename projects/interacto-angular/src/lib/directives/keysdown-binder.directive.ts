import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeysBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeysdown]'
})
export class KeysdownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysBinder> {
  @Output()
  private readonly keysdownBinder: EventEmitter<PartialKeysBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.keysdownBinder = new EventEmitter<PartialKeysBinder>();
  }

  /**
   * Starts the creation of a binding using the keys pressed interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysdown(fn: ((partialBinder: PartialKeysBinder, widget: HTMLElement) => Binding<any, any, any, unknown> | Array<Binding<any, any, any, unknown>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeysBinder {
    return this.bindings.keysDownBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialKeysBinder> {
    return this.keysdownBinder;
  }
}
