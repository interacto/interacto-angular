import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialInputBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'input:[ioWidget]'
})
export class InputBinderDirective extends InteractoBinderDirective<HTMLInputElement> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: (partialBinder: PartialInputBinder, widget: HTMLInputElement) => void) {
    const fnName = this.checkFnName(fn);

    const elt = this.element.nativeElement;

    if (elt instanceof HTMLInputElement) {
      switch (elt.type) {
        case 'checkbox':
        case 'radio':
          const bCB = this.onDyn ? this.bindings.checkboxBinder().onDynamic(elt) : this.bindings.checkboxBinder().on(elt);
          this.getComponent(fnName)[fnName](bCB, elt);
          return;

        case 'color':
          const bCol = this.onDyn ? this.bindings.colorPickerBinder().onDynamic(elt) : this.bindings.colorPickerBinder().on(elt);
          this.getComponent(fnName)[fnName](bCol, elt);
          return;

        case 'date':
          const bDate = this.onDyn ? this.bindings.dateBinder().onDynamic(elt) : this.bindings.dateBinder().on(elt);
          this.getComponent(fnName)[fnName](bDate, elt);
          return;

        case 'number':
          const bNum = this.onDyn ? this.bindings.spinnerBinder().onDynamic(elt) : this.bindings.spinnerBinder().on(elt);
          this.getComponent(fnName)[fnName](bNum, elt);
          return;
      }
    }

    throw new Error('Cannot create a binder on the input. Make sure you use Angular [ioWidget] and ' +
      'not template *ioWidget and you tag an input of type checkbox, radio, color, date, or number');
  }
}
