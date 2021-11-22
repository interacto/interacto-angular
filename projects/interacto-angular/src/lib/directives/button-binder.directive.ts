import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialButtonBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'button:[ioWidget]'
})
export class ButtonBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialButtonBinder> {
  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLButtonElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialButtonBinder, widget: HTMLButtonElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialButtonBinder {
    return this.bindings.buttonBinder();
  }
}
