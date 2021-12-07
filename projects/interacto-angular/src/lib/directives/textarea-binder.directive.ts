import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Bindings} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';
import {PartialTextInputBinder} from 'interacto/dist/api/binding/Bindings';

@Directive({
  selector: 'textarea:[ioWidget]'
})
export class TextAreaBinderDirective extends InteractoBinderDirective<HTMLTextAreaElement, PartialTextInputBinder> {
  @Output()
  private readonly textareaBinder: EventEmitter<PartialTextInputBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLTextAreaElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
    this.textareaBinder = new EventEmitter<PartialTextInputBinder>();
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialTextInputBinder, widget: HTMLTextAreaElement) => void) | undefined) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialTextInputBinder {
    return this.bindings.textInputBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialTextInputBinder> {
    return this.textareaBinder;
  }
}
