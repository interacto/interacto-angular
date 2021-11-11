import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialButtonBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'button:[ioWidget]'
})
export class ButtonBinderDirective extends InteractoBinderDirective<HTMLButtonElement> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLButtonElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: (partialBinder: PartialButtonBinder, widget: HTMLButtonElement) => void) {
    const fnName = this.checkFnName(fn);

    const elt = this.element.nativeElement;

    if (elt instanceof HTMLButtonElement) {
      const binder = this.onDyn ? this.bindings.buttonBinder().onDynamic(elt) : this.bindings.buttonBinder().on(elt);
      this.getComponent(fnName)[fnName](binder, elt);
      return;
    }

    throw new Error('Cannot create a binder on the button. Make sure you use Angular [ioWidget] ' +
      'and not template *ioWidget and you tag a button');
  }
}
