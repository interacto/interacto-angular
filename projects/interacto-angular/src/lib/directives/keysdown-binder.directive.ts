import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeysTypedBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeysdown]'
})
export class KeysdownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysTypedBinder> {
  @Output()
  private readonly keysdownBinder: EventEmitter<PartialKeysTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.keysdownBinder = new EventEmitter<PartialKeysTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the keys pressed interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysdown(fn: ((partialBinder: PartialKeysTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeysTypedBinder {
    return this.bindings.keysDownBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialKeysTypedBinder> {
    return this.keysdownBinder;
  }
}
