import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';
import {PartialTextInputBinder} from 'interacto/dist/api/binding/Bindings';

@Directive({
  selector: 'input:[ioWidget][type=text]'
})
export class TextInputBinderDirective extends InteractoBinderDirective<HTMLInputElement> {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef<HTMLInputElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn: (partialBinder: PartialTextInputBinder, widget: HTMLInputElement) => void) {
    const fnName = this.checkFnName(fn);

    const elt = this.element.nativeElement;

    if (elt instanceof HTMLInputElement && elt.type === 'text') {
        const bTxt = this.onDyn ? this.bindings.textInputBinder().onDynamic(elt) : this.bindings.textInputBinder().on(elt);
        this.getComponent(fnName)[fnName](bTxt, elt);
        return;
    }

    throw new Error('Cannot create a binder on this input (of type text). Make sure you use Angular [ioWidget] and not template *ioWidget');
  }
}
