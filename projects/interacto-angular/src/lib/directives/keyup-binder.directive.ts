import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeyBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeyup]'
})
export class KeyupBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyBinder> {
  @Output()
  private readonly keyupBinder: EventEmitter<PartialKeyBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.keyupBinder = new EventEmitter<PartialKeyBinder>();
  }

  @Input()
  modifierAccepted = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeyup(fn: ((partialBinder: PartialKeyBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeyBinder {
    return this.bindings.keyUpBinder(this.modifierAccepted);
  }

  protected getOutputEvent(): EventEmitter<PartialKeyBinder> {
    return this.keyupBinder;
  }
}
