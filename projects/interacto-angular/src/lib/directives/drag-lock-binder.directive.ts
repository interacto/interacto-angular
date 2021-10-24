import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointSrcTgtBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioDragLock]'
})
export class DragLockBinderDirective extends InteractoBinderDirective {
  constructor(element: ElementRef, viewContainerRef: ViewContainerRef, private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  /**
   * Starts the creation of a binding using the drag lock interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDragLock(fn: (partialBinder: PartialPointSrcTgtBinder | undefined) => void)  {
    const partialBinder = this.bindings.dragLockBinder().on(this.element);
    this.getComponent(fn.name)[fn.name][fn.name](partialBinder);
  }
}
