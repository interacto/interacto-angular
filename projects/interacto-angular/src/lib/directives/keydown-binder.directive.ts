import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeyBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeydown]'
})
export class KeydownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings, changeDetectorRef);
  }

  @Input()
  modifierAccepted = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeydown(fn: ((partialBinder: PartialKeyBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeyBinder {
    return this.onDyn ? this.bindings.keyDownBinder(this.modifierAccepted).onDynamic(this.element):
      this.bindings.keyDownBinder(this.modifierAccepted).on(this.element);
  }
}
