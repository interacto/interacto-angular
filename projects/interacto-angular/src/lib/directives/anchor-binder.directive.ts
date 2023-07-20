import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialAnchorBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'a:[ioAnchor],[ioAnchor] [ioOnDynamic]'
})
export class AnchorBinderDirective extends InteractoBinderDirective<HTMLAnchorElement, PartialAnchorBinder> {
  @Output()
  private readonly aBinder: EventEmitter<PartialAnchorBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLAnchorElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.aBinder = new EventEmitter<PartialAnchorBinder>();
  }

  @Input()
  set ioAnchor(fn: ((partialBinder: PartialAnchorBinder, widget: HTMLAnchorElement) => Binding<any, any, any, unknown> | Array<Binding<any, any, any, unknown>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialAnchorBinder {
    return this.bindings.hyperlinkBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialAnchorBinder> {
    return this.aBinder;
  }
}
