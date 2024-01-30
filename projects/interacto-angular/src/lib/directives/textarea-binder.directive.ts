import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, UndoHistoryBase, PartialTextInputTypedBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';


@Directive({
  selector: 'textarea:[ioTextarea], [ioTextarea] [ioOnDynamic]'
})
export class TextAreaBinderDirective extends InteractoBinderDirective<HTMLTextAreaElement, PartialTextInputTypedBinder> {
  @Output()
  private readonly textareaBinder: EventEmitter<PartialTextInputTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLTextAreaElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.textareaBinder = new EventEmitter<PartialTextInputTypedBinder>();
  }

  @Input()
  set ioTextarea(fn: ((partialBinder: PartialTextInputTypedBinder, widget: HTMLTextAreaElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTextInputTypedBinder {
    return this.bindings.textInputBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialTextInputTypedBinder> {
    return this.textareaBinder;
  }
}
