import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeyBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeydown]'
})
export class KeydownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyBinder> {
  @Output()
  private readonly keydownBinder: EventEmitter<PartialKeyBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.keydownBinder = new EventEmitter<PartialKeyBinder>();
  }

  @Input()
  modifierAccepted = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeydown(fn: ((partialBinder: PartialKeyBinder, widget: HTMLElement) => Binding<any, any, any, unknown> | Array<Binding<any, any, any, unknown>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeyBinder {
    return this.bindings.keyDownBinder(this.modifierAccepted);
  }

  protected getOutputEvent(): EventEmitter<PartialKeyBinder> {
    return this.keydownBinder;
  }
}
