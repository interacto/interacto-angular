import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialSelectBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'select:[ioWidget]'
})
export class SelectBinderDirective extends InteractoBinderDirective<HTMLSelectElement, PartialSelectBinder> {
  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLSelectElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialSelectBinder, widget: HTMLSelectElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialSelectBinder {
    return this.bindings.comboBoxBinder();
  }
}
