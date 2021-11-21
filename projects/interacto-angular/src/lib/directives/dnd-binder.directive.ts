import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointSrcTgtBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioDnd]'
})
export class DndBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointSrcTgtBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings, changeDetectorRef);
  }

  @Input()
  cancellable = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioDnd(fn: ((partialBinder: PartialPointSrcTgtBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointSrcTgtBinder {
    return this.onDyn ? this.bindings.dndBinder(this.cancellable).onDynamic(this.element):
      this.bindings.dndBinder(this.cancellable).on(this.element);
  }
}
