import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointBinder} from 'interacto';

@Directive({
  selector: '[ioClick]'
})
export class ClickBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
  }

  /**
   * Starts the creation of a binding using the click interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClick(fn: (partialBinder: PartialPointBinder | undefined) => void)  {
    const partialBinder = this.bindings.clickBinder().on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
