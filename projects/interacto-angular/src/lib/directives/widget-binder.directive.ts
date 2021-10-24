import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, Interaction, InteractionBinder, WidgetData} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioWidget]'
})
export class WidgetBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  set ioWidget(fn:
      (partialBinder: InteractionBinder<Interaction<WidgetData<HTMLElement>>, WidgetData<HTMLElement>>,
       widget: HTMLElement | undefined) => void | undefined) {
    if (fn === undefined) {
      throw new Error('The callback function provided to the button directive does not exist in the component');
    }

    // If we call fn directly, the 'this' used in fn is unknown.
    // Tries with binding fn with the component failed.
    // So we get the name of fn
    const elt = this.element.nativeElement;

    if (elt instanceof HTMLButtonElement) {
      this.getComponent(fn.name)[fn.name](this.bindings.buttonBinder().on(elt), elt);
      return;
    }

    if (elt instanceof HTMLInputElement) {
      switch (elt.type) {
        case 'checkbox':
        case 'radio':
          this.getComponent(fn.name)[fn.name](this.bindings.checkboxBinder().on(elt), elt);
          return;

        case 'color':
          this.getComponent(fn.name)[fn.name](this.bindings.checkboxBinder().on(elt), elt);
          return;

        case 'date':
          this.getComponent(fn.name)[fn.name](this.bindings.dateBinder().on(elt), elt);
          return;

        case 'number':
          this.getComponent(fn.name)[fn.name](this.bindings.spinnerBinder().on(elt), elt);
          return;

        case 'text':
          this.getComponent(fn.name)[fn.name](this.bindings.textInputBinder().on(elt), elt);
          return;
      }

      throw new Error(`InputElement not supported: ${elt.type}`);
    }

    if (elt instanceof HTMLSelectElement) {
      this.getComponent(fn.name)[fn.name](this.bindings.comboBoxBinder().on(elt), elt);
      return;
    }

    if (elt instanceof HTMLAnchorElement) {
      this.getComponent(fn.name)[fn.name](this.bindings.hyperlinkBinder().on(elt), elt);
      return;
    }

    if (elt instanceof HTMLTextAreaElement) {
      this.getComponent(fn.name)[fn.name](this.bindings.textInputBinder().on(elt), elt);
      return;
    }

    throw new Error(`Cannot create a binder on this element: ${elt.prototype?.name ?? '[prototype is undefined]'}.
Make sure you use Angular [ioWidget] and not template *ioWidget`);
  }
}
