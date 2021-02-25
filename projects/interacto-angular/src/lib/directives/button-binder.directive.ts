import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {buttonBinder, Interaction, InteractionBinder, WidgetData} from 'interacto';

@Directive({
  selector: '[ioButton]'
})
export class ButtonBinderDirective {
  constructor(private element: ElementRef, private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set ioButton(fn:
     (partialBinder: InteractionBinder<Interaction<WidgetData<HTMLButtonElement>>, WidgetData<HTMLButtonElement>> | undefined) => void) {
    if (fn === undefined) {
      throw new Error('The callback function provided to the button directive does not exist in the component');
    }
    // If we call fn directly, the 'this' used in fn is unknown.
    // Tries with binding fn with the component failed.
    // So we get the name of fn
    (this.viewContainerRef as any)._view.component[fn.name](buttonBinder().on(this.element));
  }
}
