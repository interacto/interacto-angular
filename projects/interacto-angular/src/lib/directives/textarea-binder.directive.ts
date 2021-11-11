import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';
import {PartialTextInputBinder} from 'interacto/dist/api/binding/Bindings';

@Directive({
  selector: 'textarea:[ioWidget]'
})
export class TextAreaBinderDirective extends InteractoBinderDirective<HTMLTextAreaElement> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLTextAreaElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: (partialBinder: PartialTextInputBinder, widget: HTMLTextAreaElement) => void) {
    const fnName = this.checkFnName(fn);

    const elt = this.element.nativeElement;

    if (elt instanceof HTMLTextAreaElement) {
        const bTxt = this.onDyn ? this.bindings.textInputBinder().onDynamic(elt) : this.bindings.textInputBinder().on(elt);
        this.getComponent(fnName)[fnName](bTxt, elt);
        return;
    }

    throw new Error('Cannot create a binder on this text area. Make sure you use Angular [ioWidget] and not template *ioWidget');
  }
}
