import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointsBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * The expected number of clicks.
   */
  @Input()
  count = 2;

  /**
   * Starts the creation of a binding using the clicks interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioClicks(fn: (partialBinder: PartialPointsBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values
    const partialBinder = this.bindings.clicksBinder(this.count).on(this.element);
    this.getComponent(fn.name)[fn.name](partialBinder);
  }
}
