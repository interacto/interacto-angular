import {ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointSrcTgtBinder} from 'interacto';

@Directive({
  selector: '[ioDnd]'
})
export class DndBinderDirective {
  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
  }

  @Input()
  cancellable = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDnd(fn: (partialBinder: PartialPointSrcTgtBinder | undefined) => void)  {
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values
    const partialBinder = this.bindings.dndBinder(this.cancellable).on(this.element);
    (this.viewContainerRef as any)._hostLView[8][fn.name](partialBinder);
  }
}
