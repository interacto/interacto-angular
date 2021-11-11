import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialSelectBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'select:[ioWidget]'
})
export class SelectBinderDirective extends InteractoBinderDirective<HTMLSelectElement> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLSelectElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: (partialBinder: PartialSelectBinder, widget: HTMLSelectElement) => void) {
    const fnName = this.checkFnName(fn);

    const elt = this.element.nativeElement;

    if (elt instanceof HTMLSelectElement) {
      const binder = this.onDyn ? this.bindings.comboBoxBinder().onDynamic(elt) : this.bindings.comboBoxBinder().on(elt);
      this.getComponent(fnName)[fnName](binder, elt);
      return;
    }

    throw new Error('Cannot create a binder on the select element. Make sure you use ' +
      'Angular [ioWidget] and not template *ioWidget and you tag a select element');
  }
}
