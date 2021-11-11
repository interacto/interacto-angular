import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialAnchorBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'a:[ioWidget]'
})
export class AnchorBinderDirective extends InteractoBinderDirective {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: (partialBinder: PartialAnchorBinder, widget: HTMLAnchorElement) => void) {
    const fnName = this.checkFnName(fn);

    const elt = this.element.nativeElement;

    if (elt instanceof HTMLAnchorElement) {
      const binder = this.onDyn ? this.bindings.hyperlinkBinder().onDynamic(elt) : this.bindings.hyperlinkBinder().on(elt);
      this.getComponent(fnName)[fnName](binder, elt);
      return;
    }

    throw new Error(`Cannot create a binder on the anchor: ${elt.prototype?.name ?? '[prototype is undefined]'}.
Make sure you use Angular [ioWidget] and not template *ioWidget and you tag an anchor`);
  }
}
