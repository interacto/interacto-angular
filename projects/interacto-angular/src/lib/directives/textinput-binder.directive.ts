import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, UndoHistoryBase, PartialTextInputTypedBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'input:[ioTextinput][type=text], [ioTextinput] [ioOnDynamic]',
  standalone: true
})
export class TextInputBinderDirective extends InteractoBinderDirective<HTMLInputElement, PartialTextInputTypedBinder> {
  @Output()
  private readonly textinputBinder: EventEmitter<PartialTextInputTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.textinputBinder = new EventEmitter<PartialTextInputTypedBinder>();
  }

  @Input()
  set ioTextinput(fn: ((partialBinder: PartialTextInputTypedBinder, widget: HTMLInputElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTextInputTypedBinder {
    return this.bindings.textInputBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialTextInputTypedBinder> {
    return this.textinputBinder;
  }
}
