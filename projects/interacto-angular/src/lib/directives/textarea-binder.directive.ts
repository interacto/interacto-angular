import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, UndoHistoryBase, PartialTextInputBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';


@Directive({
  selector: 'textarea:[ioTextarea], [ioTextarea] [ioOnDynamic]'
})
export class TextAreaBinderDirective extends InteractoBinderDirective<HTMLTextAreaElement, PartialTextInputBinder> {
  @Output()
  private readonly textareaBinder: EventEmitter<PartialTextInputBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLTextAreaElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.textareaBinder = new EventEmitter<PartialTextInputBinder>();
  }

  @Input()
  set ioTextarea(fn: ((partialBinder: PartialTextInputBinder, widget: HTMLTextAreaElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTextInputBinder {
    return this.bindings.textInputBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialTextInputBinder> {
    return this.textareaBinder;
  }
}
