import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialAnchorBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'a:[ioWidget]'
})
export class AnchorBinderDirective extends InteractoBinderDirective<HTMLAnchorElement, PartialAnchorBinder> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLAnchorElement>,
              viewContainerRef: ViewContainerRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings);
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialAnchorBinder, widget: HTMLAnchorElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialAnchorBinder {
    return this.onDyn ? this.bindings.hyperlinkBinder().onDynamic(this.element) : this.bindings.hyperlinkBinder().on(this.element);
  }
}
