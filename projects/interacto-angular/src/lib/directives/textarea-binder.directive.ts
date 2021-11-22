import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';
import {PartialTextInputBinder} from 'interacto/dist/api/binding/Bindings';

@Directive({
  selector: 'textarea:[ioWidget]'
})
export class TextAreaBinderDirective extends InteractoBinderDirective<HTMLTextAreaElement, PartialTextInputBinder> {
  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLTextAreaElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialTextInputBinder, widget: HTMLTextAreaElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTextInputBinder {
    return this.bindings.textInputBinder();
  }
}
