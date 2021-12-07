import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';
import {PartialTextInputBinder} from 'interacto/dist/api/binding/Bindings';

@Directive({
  selector: 'input:[ioWidget][type=text]'
})
export class TextInputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialTextInputBinder> {
  @Output()
  private readonly textinputBinder: EventEmitter<PartialTextInputBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
    this.textinputBinder = new EventEmitter<PartialTextInputBinder>();
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialTextInputBinder, widget: HTMLInputElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTextInputBinder {
    return this.bindings.textInputBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialTextInputBinder> {
    return this.textinputBinder;
  }
}
