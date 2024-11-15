import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialAnchorTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'a:[ioAnchor],[ioAnchor] [ioOnDynamic]',
  standalone: true
})
export class AnchorBinderDirective extends InteractoBinderDirective<HTMLAnchorElement, PartialAnchorTypedBinder> {
  @Output()
  private readonly aBinder: EventEmitter<PartialAnchorTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLAnchorElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.aBinder = new EventEmitter<PartialAnchorTypedBinder>();
  }

  @Input()
  set ioAnchor(fn: ((partialBinder: PartialAnchorTypedBinder, widget: HTMLAnchorElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialAnchorTypedBinder {
    return this.bindings.hyperlinkBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialAnchorTypedBinder> {
    return this.aBinder;
  }
}
