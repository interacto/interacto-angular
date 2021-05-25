import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, Interaction, InteractionBinder, WidgetData} from 'interacto';

@Directive({
  selector: '[ioWidget]'
})
export class WidgetBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
  }

  @Input()
  set ioWidget(fn:
     (partialBinder: InteractionBinder<Interaction<WidgetData<HTMLElement>>, WidgetData<HTMLElement>> | undefined) => void) {
    if (fn === undefined) {
      throw new Error('The callback function provided to the button directive does not exist in the component');
    }
    const componentFn = (this.viewContainerRef as any)._hostLView[8][fn.name];
    // If we call fn directly, the 'this' used in fn is unknown.
    // Tries with binding fn with the component failed.
    // So we get the name of fn
    const elt = this.element.nativeElement;

    if (elt instanceof HTMLButtonElement) {
      componentFn(this.bindings.buttonBinder().on(elt));
      return;
    }

    if (elt instanceof HTMLInputElement) {
      switch (elt.type) {
        case 'checkbox':
        case 'radio':
          componentFn(this.bindings.checkboxBinder().on(elt));
          return;

        case 'color':
          componentFn(this.bindings.checkboxBinder().on(elt));
          return;

        case 'date':
          componentFn(this.bindings.dateBinder().on(elt));
          return;

        case 'number':
          componentFn(this.bindings.spinnerBinder().on(elt));
          return;

        case 'text':
          componentFn(this.bindings.textInputBinder().on(elt));
          return;
      }

      throw new Error(`InputElement not supported: ${elt.type}`);
    }

    if (elt instanceof HTMLSelectElement) {
      componentFn(this.bindings.comboBoxBinder().on(elt));
      return;
    }

    if (elt instanceof HTMLAnchorElement) {
      componentFn(this.bindings.hyperlinkBinder().on(elt));
      return;
    }

    if (elt instanceof HTMLTextAreaElement) {
      componentFn(this.bindings.textInputBinder().on(elt));
      return;
    }

    throw new Error(`Cannot create a binder on this element: ${elt.prototype.name}`);
  }
}
