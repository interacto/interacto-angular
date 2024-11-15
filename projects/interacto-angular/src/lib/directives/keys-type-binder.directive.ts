import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeysTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioKeysType]',
  standalone: true
})
export class KeysTypeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeysTypedBinder> {
  @Output()
  private readonly keysTypeBinder: EventEmitter<PartialKeysTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.keysTypeBinder = new EventEmitter<PartialKeysTypedBinder>();
  }

  /**
   * Starts the creation of a binding using the multiple key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeysType(fn: ((partialBinder: PartialKeysTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeysTypedBinder {
    return this.bindings.keysTypeBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialKeysTypedBinder> {
    return this.keysTypeBinder;
  }
}
