import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeyBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioKeyType]'
})
export class KeyTypeBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyBinder> {
  @Output()
  private readonly keyTypeBinder: EventEmitter<PartialKeyBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.keyTypeBinder = new EventEmitter<PartialKeyBinder>();
  }

  /**
   * Starts the creation of a binding using the key typing interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeyType(fn: ((partialBinder: PartialKeyBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeyBinder {
    return this.bindings.keyTypeBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialKeyBinder> {
    return this.keyTypeBinder;
  }
}
