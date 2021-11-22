import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialAnchorBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'a:[ioWidget]'
})
export class AnchorBinderDirective extends InteractoBinderDirective<HTMLAnchorElement, PartialAnchorBinder> {
  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLAnchorElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialAnchorBinder, widget: HTMLAnchorElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialAnchorBinder {
    return this.bindings.hyperlinkBinder();
  }
}
