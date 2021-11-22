import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialInputBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'input:[ioWidget] :not([type=text])'
})
export class InputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialInputBinder> {
  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: (partialBinder: PartialInputBinder, widget: HTMLInputElement) => void) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialInputBinder {
    const elt = this.element.nativeElement;

    if (elt instanceof HTMLInputElement) {
      switch (elt.type) {
        case 'checkbox':
        case 'radio':
          return this.bindings.checkboxBinder();
        case 'color':
          return this.bindings.colorPickerBinder();
        case 'date':
          return this.bindings.dateBinder();
        case 'number':
          return this.bindings.spinnerBinder();
      }
    }

    throw new Error('Cannot create a binder on the input. Make sure you use Angular [ioWidget] and ' +
      'not template *ioWidget and you tag an input of type checkbox, radio, color, date, or number');
  }
}
