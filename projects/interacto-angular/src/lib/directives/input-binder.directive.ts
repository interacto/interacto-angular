import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialInputTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'input:[ioInput] :not([type=text]), [ioInput] [ioOnDynamic]'
})
export class InputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialInputTypedBinder> {
  @Output()
  private readonly inputBinder: EventEmitter<PartialInputTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.inputBinder = new EventEmitter<PartialInputTypedBinder>();
  }

  @Input()
  set ioInput(fn: ((partialBinder: PartialInputTypedBinder, widget: HTMLInputElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialInputTypedBinder {
    const elt = this.getElementContent();

    if (elt instanceof HTMLInputElement) {
      switch (elt.type) {
        case 'checkbox':
        case 'radio':
          return this.bindings.checkboxBinder();
        case 'color':
          return this.bindings.colorPickerBinder();
        case 'date':
          return this.bindings.dateBinder();
        case 'number':
          return this.bindings.spinnerBinder();
      }
    }

    throw new Error('Cannot create a binder on the input.');
  }

  protected getOutputEvent(): EventEmitter<PartialInputTypedBinder> {
    return this.inputBinder;
  }
}
