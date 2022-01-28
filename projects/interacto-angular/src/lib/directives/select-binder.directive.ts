import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialSelectBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'select:[ioSelect], [ioSelect] [ioOnDynamic]'
})
export class SelectBinderDirective extends InteractoBinderDirective<HTMLSelectElement, PartialSelectBinder> {
  @Output()
  private readonly selectBinder: EventEmitter<PartialSelectBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLSelectElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.selectBinder = new EventEmitter<PartialSelectBinder>();
  }

  @Input()
  set ioSelect(fn: ((partialBinder: PartialSelectBinder, widget: HTMLSelectElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialSelectBinder {
    return this.bindings.comboBoxBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialSelectBinder> {
    return this.selectBinder;
  }
}
