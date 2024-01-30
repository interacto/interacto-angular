import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialSelectTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'select:[ioSelect], [ioSelect] [ioOnDynamic]'
})
export class SelectBinderDirective extends InteractoBinderDirective<HTMLSelectElement, PartialSelectTypedBinder> {
  @Output()
  private readonly selectBinder: EventEmitter<PartialSelectTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLSelectElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.selectBinder = new EventEmitter<PartialSelectTypedBinder>();
  }

  @Input()
  set ioSelect(fn: ((partialBinder: PartialSelectTypedBinder, widget: HTMLSelectElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialSelectTypedBinder {
    return this.bindings.comboBoxBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialSelectTypedBinder> {
    return this.selectBinder;
  }
}
