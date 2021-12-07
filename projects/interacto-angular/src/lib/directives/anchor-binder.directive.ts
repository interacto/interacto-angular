import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Bindings, PartialAnchorBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'a:[ioWidget]'
})
export class AnchorBinderDirective extends InteractoBinderDirective<HTMLAnchorElement, PartialAnchorBinder> {
  @Output()
  private readonly aBinder: EventEmitter<PartialAnchorBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLAnchorElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
    this.aBinder = new EventEmitter<PartialAnchorBinder>();
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialAnchorBinder, widget: HTMLAnchorElement) => void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialAnchorBinder {
    return this.bindings.hyperlinkBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialAnchorBinder> {
    return this.aBinder;
  }
}
