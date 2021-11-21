import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialInputBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'input:[ioWidget] :not([type=text])'
})
export class InputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialInputBinder> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
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
          return this.onDyn ? this.bindings.checkboxBinder().onDynamic(elt) : this.bindings.checkboxBinder().on(elt);
        case 'color':
          return this.onDyn ? this.bindings.colorPickerBinder().onDynamic(elt) : this.bindings.colorPickerBinder().on(elt);
        case 'date':
          return this.onDyn ? this.bindings.dateBinder().onDynamic(elt) : this.bindings.dateBinder().on(elt);
        case 'number':
          return this.onDyn ? this.bindings.spinnerBinder().onDynamic(elt) : this.bindings.spinnerBinder().on(elt);
      }
    }

    throw new Error('Cannot create a binder on the input. Make sure you use Angular [ioWidget] and ' +
      'not template *ioWidget and you tag an input of type checkbox, radio, color, date, or number');
  }
}
