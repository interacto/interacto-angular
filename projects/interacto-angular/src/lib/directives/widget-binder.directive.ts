import {Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, Interaction, InteractionBinder, WidgetData} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioWidget]'
})
export class WidgetBinderDirective extends InteractoBinderDirective {
  constructor(@Optional() @Host() public onDyn: OnDynamicDirective,
              element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn:
                 (partialBinder: InteractionBinder<Interaction<WidgetData<any>>, WidgetData<any>>,
                  widget: HTMLElement) => void) {
    const fnName = this.checkFnName(fn);

    // If we call fn directly, the 'this' used in fn is unknown.
    // Tries with binding fn with the component failed.
    // So we get the name of fn
    const elt = this.element.nativeElement;

    if (elt instanceof HTMLButtonElement) {
      const binder = this.onDyn ? this.bindings.buttonBinder().onDynamic(elt) : this.bindings.buttonBinder().on(elt);
      this.getComponent(fnName)[fnName](binder, elt);
      return;
    }

    if (elt instanceof HTMLInputElement) {
      switch (elt.type) {
        case 'checkbox':
        case 'radio':
          const bCB = this.onDyn ? this.bindings.checkboxBinder().onDynamic(elt) : this.bindings.checkboxBinder().on(elt);
          this.getComponent(fnName)[fnName](bCB, elt);
          return;

        case 'color':
          const bCol = this.onDyn ? this.bindings.colorPickerBinder().onDynamic(elt) : this.bindings.colorPickerBinder().on(elt);
          this.getComponent(fnName)[fnName](bCol, elt);
          return;

        case 'date':
          const bDate = this.onDyn ? this.bindings.dateBinder().onDynamic(elt) : this.bindings.dateBinder().on(elt);
          this.getComponent(fnName)[fnName](bDate, elt);
          return;

        case 'number':
          const bNum = this.onDyn ? this.bindings.spinnerBinder().onDynamic(elt) : this.bindings.spinnerBinder().on(elt);
          this.getComponent(fnName)[fnName](bNum, elt);
          return;

        case 'text':
          const bTxt = this.onDyn ? this.bindings.textInputBinder().onDynamic(elt) : this.bindings.textInputBinder().on(elt);
          this.getComponent(fnName)[fnName](bTxt, elt);
          return;
      }

      throw new Error(`InputElement not supported: ${elt.type}`);
    }

    if (elt instanceof HTMLSelectElement) {
      const binder = this.onDyn ? this.bindings.comboBoxBinder().onDynamic(elt) : this.bindings.comboBoxBinder().on(elt);
      this.getComponent(fnName)[fnName](binder, elt);
      return;
    }

    if (elt instanceof HTMLAnchorElement) {
      const binder = this.onDyn ? this.bindings.hyperlinkBinder().onDynamic(elt) : this.bindings.hyperlinkBinder().on(elt);
      this.getComponent(fnName)[fnName](binder, elt);
      return;
    }

    if (elt instanceof HTMLTextAreaElement) {
      const binder = this.onDyn ? this.bindings.textInputBinder().onDynamic(elt) : this.bindings.textInputBinder().on(elt);
      this.getComponent(fnName)[fnName](binder, elt);
      return;
    }

    throw new Error(`Cannot create a binder on this element: ${elt.prototype?.name ?? '[prototype is undefined]'}.
Make sure you use Angular [ioWidget] and not template *ioWidget`);
  }
}
