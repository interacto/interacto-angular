import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Bindings, PartialSelectBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'select:[ioWidget]'
})
export class SelectBinderDirective extends InteractoBinderDirective<HTMLSelectElement, PartialSelectBinder> {
  @Output()
  private readonly selectBinder: EventEmitter<PartialSelectBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLSelectElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
    this.selectBinder = new EventEmitter<PartialSelectBinder>();
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialSelectBinder, widget: HTMLSelectElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialSelectBinder {
    return this.bindings.comboBoxBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialSelectBinder> {
    return this.selectBinder;
  }
}
