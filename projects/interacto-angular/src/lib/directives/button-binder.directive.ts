import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialButtonBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'button:[ioWidget]'
})
export class ButtonBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialButtonBinder> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLButtonElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialButtonBinder, widget: HTMLButtonElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialButtonBinder {
    return this.onDyn ? this.bindings.buttonBinder().onDynamic(this.element) : this.bindings.buttonBinder().on(this.element);
  }
}
