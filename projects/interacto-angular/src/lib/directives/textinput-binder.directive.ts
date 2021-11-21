import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';
import {PartialTextInputBinder} from 'interacto/dist/api/binding/Bindings';

@Directive({
  selector: 'input:[ioWidget][type=text]'
})
export class TextInputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialTextInputBinder> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialTextInputBinder, widget: HTMLInputElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTextInputBinder {
    return this.onDyn ? this.bindings.textInputBinder().onDynamic(this.element): this.bindings.textInputBinder().on(this.element);
  }
}
