import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointSrcTgtBinder} from 'interacto';

@Directive({
  selector: '[ioDragLock]'
})
export class DragLockBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
  }

  /**
   * Starts the creation of a binding using the drag lock interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDragLock(fn: (partialBinder: PartialPointSrcTgtBinder | undefined) => void)  {
    const partialBinder = this.bindings.dragLockBinder().on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
