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
    // If we call fn directly, the 'this' used in fn is unknown.
    // Tries with binding fn with the component failed.
    // So we get the name of fn
    const elt = this.element.nativeElement;

    if (elt instanceof HTMLButtonElement) {
      (this.viewContainerRef as any)._view.component[fn.name](this.bindings.buttonBinder().on(elt));
      return;
    }

    if (elt instanceof HTMLInputElement) {
      switch (elt.type) {
        case 'checkbox':
        case 'radio':
          (this.viewContainerRef as any)._view.component[fn.name](this.bindings.checkboxBinder().on(elt));
          return;

        case 'color':
          (this.viewContainerRef as any)._view.component[fn.name](this.bindings.checkboxBinder().on(elt));
          return;

        case 'date':
          (this.viewContainerRef as any)._view.component[fn.name](this.bindings.dateBinder().on(elt));
          return;

        case 'number':
          (this.viewContainerRef as any)._view.component[fn.name](this.bindings.spinnerBinder().on(elt));
          return;

        case 'text':
          (this.viewContainerRef as any)._view.component[fn.name](this.bindings.textInputBinder().on(elt));
          return;
      }

      throw new Error(`InputElement not supported: ${elt.type}`);
    }

    if (elt instanceof HTMLSelectElement) {
      (this.viewContainerRef as any)._view.component[fn.name](this.bindings.comboBoxBinder().on(elt));
      return;
    }

    if (elt instanceof HTMLAnchorElement) {
      (this.viewContainerRef as any)._view.component[fn.name](this.bindings.hyperlinkBinder().on(elt));
      return;
    }

    if (elt instanceof HTMLTextAreaElement) {
      (this.viewContainerRef as any)._view.component[fn.name](this.bindings.textInputBinder().on(elt));
      return;
    }

    throw new Error(`Cannot create a binder on this element: ${elt.prototype.name}`);
  }
}